import Razorpay from 'razorpay';
import crypto from 'crypto';
import Subscription from '../models/Subscription.js';
import Invoice from '../models/Invoice.js';
import User from '../models/User.js';
import { emitStats, emitUsersList, emitPaymentsList } from '../config/socket.js';
import { mailService } from '../services/mail.service.js';

// Plan normalize helper
const normalizePlanName = (plan) => {
  if (!plan) return 'Basic';
  const lowercase = plan.toLowerCase();
  if (lowercase.includes('enterprise')) return 'Enterprise';
  if (lowercase.includes('professional') || lowercase.includes('business')) return 'Professional';
  return 'Basic';
};

// Plan pricing map
const PLAN_PRICES = {
  Basic: 1,
  Professional: 1,
  Enterprise: 1
};

// Plan limits map
const PLAN_LIMITS = {
  Basic: { storageLimit: 50, bandwidthLimit: '500 GB' },
  Professional: { storageLimit: 100, bandwidthLimit: 'Unlimited' },
  Enterprise: { storageLimit: 200, bandwidthLimit: 'Unlimited' }
};

/**
 * Initiates a new Razorpay checkout order.
 */
export const createOrder = async (req, res) => {
  try {
    const { planName } = req.body;
    const normalizedPlan = normalizePlanName(planName);
    const price = PLAN_PRICES[normalizedPlan];

    if (!price) {
      return res.status(400).json({ success: false, message: 'Invalid plan selected' });
    }

    const keyId = (process.env.RAZORPAY_KEY_ID || '').replace(/^"(.*)"$/, '$1').trim();
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || '').replace(/^"(.*)"$/, '$1').trim();

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials missing in env variables!');
      return res.status(500).json({ success: false, message: 'Payment gateway configuration is currently missing' });
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });

    const options = {
      amount: price * 100, // Razorpay requires amount in paisa
      currency: 'INR',
      receipt: `rcpt_order_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
        planName: normalizedPlan
      }
    };

    console.log(`Creating Razorpay Order for client ${req.user._id} (${normalizedPlan} Plan)...`);
    const order = await instance.orders.create(options);

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Verifies payment signature and processes database updates and notifications.
 */
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planName } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing transaction parameters' });
    }

    // Avoid double processing if webhook already processed it
    const existingInvoice = await Invoice.findOne({ paymentId: razorpay_payment_id });
    if (existingInvoice) {
      console.log(`Payment ${razorpay_payment_id} already processed via webhook.`);
      return res.json({
        success: true,
        message: 'Payment verified and subscription activated successfully',
        invoice: existingInvoice
      });
    }

    // Verify HMAC SHA256 Signature (sanitizing secret)
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || '').replace(/^"(.*)"$/, '$1').trim();
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac('sha256', keySecret)
      .update(sign.toString())
      .digest('hex');

    if (expectedSign !== razorpay_signature) {
      console.warn(`Signature verification failed for order ${razorpay_order_id}!`);
      return res.status(400).json({ success: false, message: 'Payment verification signature mismatch' });
    }

    console.log(`Payment signature verified successfully for Order: ${razorpay_order_id}, Payment: ${razorpay_payment_id}`);

    const normalizedPlan = normalizePlanName(planName);
    const price = PLAN_PRICES[normalizedPlan];
    const limit = PLAN_LIMITS[normalizedPlan];

    // 1. Calculate Expiry Date (extend if current is active)
    let sub = await Subscription.findOne({ userId: req.user._id });
    const currentDate = new Date();
    let expiryDate = new Date();

    if (sub && sub.status === 'Active' && sub.expiry > currentDate) {
      expiryDate.setTime(new Date(sub.expiry).getTime() + (365 * 24 * 60 * 60 * 1000));
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    // 2. Create or Update Subscription
    if (!sub) {
      sub = new Subscription({
        userId: req.user._id,
        plan: normalizedPlan,
        price,
        expiry: expiryDate,
        status: 'Active',
        storageLimit: limit.storageLimit,
        storageUsed: 0,
        bandwidthLimit: limit.bandwidthLimit
      });
    } else {
      sub.plan = normalizedPlan;
      sub.price = price;
      sub.expiry = expiryDate;
      sub.status = 'Active';
      sub.storageLimit = limit.storageLimit;
      sub.bandwidthLimit = limit.bandwidthLimit;
    }
    await sub.save();
    console.log(`Subscription updated in DB for client ${req.user._id}. Expiry: ${expiryDate.toISOString()}`);

    // 3. Ensure User account status is Active
    const userObj = await User.findById(req.user._id);
    if (userObj && userObj.status !== 'Active') {
      userObj.status = 'Active';
      await userObj.save();
      console.log(`User status updated to Active for user: ${req.user._id}`);
    }

    // 4. Create Invoice Record
    const invoiceId = `INV-${Date.now().toString().substring(5)}`;
    const invoice = await Invoice.create({
      invoiceId,
      userId: req.user._id,
      paymentId: razorpay_payment_id,
      plan: `${normalizedPlan} Maintenance Plan`,
      amount: price,
      status: 'Paid',
      billingDate: new Date()
    });
    console.log(`Invoice ${invoiceId} created successfully.`);

    // 5. Emit Socket Updates immediately
    const io = req.app.get('io');
    if (io) {
      emitStats(io);
      emitUsersList(io);
      emitPaymentsList(io);
      console.log('Socket.io statistics and list updates emitted.');
    }

    // 6. Send email notifications to user and admin concurrently (safely catch errors to prevent server crash)
    mailService.sendPaymentNotification(req.user, normalizedPlan, price, invoiceId, razorpay_payment_id)
      .catch(err => console.error('Error sending payment notification mail:', err));

    res.json({
      success: true,
      message: 'Payment verified and subscription activated successfully',
      invoice
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Webhook handler called directly by Razorpay's servers.
 * Verifies webhook signature and processes payment/activation asynchronously.
 */
export const razorpayWebhook = async (req, res) => {
  try {
    const webhookSecretRaw = process.env.RAZORPAY_WEBHOOK_SECRET;
    const webhookSecret = (webhookSecretRaw || '').replace(/^"(.*)"$/, '$1').trim();
    if (!webhookSecret) {
      console.error('RAZORPAY_WEBHOOK_SECRET is not defined in env variables!');
      return res.status(500).json({ success: false, message: 'Webhook secret missing' });
    }

    // Verify webhook signature using raw body for byte-perfect comparison
    const signature = req.headers['x-razorpay-signature'];
    if (!signature) {
      console.warn('Webhook received without x-razorpay-signature header!');
      return res.status(400).json({ success: false, message: 'Missing signature' });
    }

    const rawBody = req.rawBody ? req.rawBody.toString('utf-8') : JSON.stringify(req.body);
    const shasum = crypto.createHmac('sha256', webhookSecret);
    shasum.update(rawBody);
    const digest = shasum.digest('hex');

    if (digest !== signature) {
      console.warn('Webhook signature verification failed!');
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const { event, payload } = req.body;

    console.log(`Razorpay webhook event received: ${event}`);

    // Process payment when order is paid
    if (event === 'order.paid') {
      const orderEntity = payload.order.entity;
      const { id: orderId, notes } = orderEntity;

      if (!notes || !notes.userId || !notes.planName) {
        console.warn(`Webhook ignored: Order ${orderId} does not contain userId/planName in notes.`);
        return res.json({ status: 'ok', message: 'No metadata notes in order' });
      }

      const { userId, planName } = notes;
      
      // Attempt to retrieve payment ID from payload payments or fall back to a dynamic order payment key
      const paymentId = payload.payment?.entity?.id || `PAY-ORDER-${orderId}`;

      const existingInvoice = await Invoice.findOne({ paymentId });
      if (existingInvoice) {
        console.log(`Webhook: Payment ${paymentId} already processed.`);
        return res.json({ success: true, message: 'Already processed' });
      }

      const normalizedPlan = normalizePlanName(planName);
      const price = PLAN_PRICES[normalizedPlan];
      const limit = PLAN_LIMITS[normalizedPlan];

      // Find user
      const user = await User.findById(userId);
      if (!user) {
        console.error(`Webhook error: User ${userId} not found in DB!`);
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // 1. Calculate Expiry Date (extend if current is active)
      let sub = await Subscription.findOne({ userId });
      const currentDate = new Date();
      let expiryDate = new Date();

      if (sub && sub.status === 'Active' && sub.expiry > currentDate) {
        expiryDate.setTime(new Date(sub.expiry).getTime() + (365 * 24 * 60 * 60 * 1000));
      } else {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      }

      // 2. Create or Update Subscription
      if (!sub) {
        sub = new Subscription({
          userId,
          plan: normalizedPlan,
          price,
          expiry: expiryDate,
          status: 'Active',
          storageLimit: limit.storageLimit,
          storageUsed: 0,
          bandwidthLimit: limit.bandwidthLimit
        });
      } else {
        sub.plan = normalizedPlan;
        sub.price = price;
        sub.expiry = expiryDate;
        sub.status = 'Active';
        sub.storageLimit = limit.storageLimit;
        sub.bandwidthLimit = limit.bandwidthLimit;
      }
      await sub.save();
      console.log(`Webhook: Subscription updated in DB for client ${userId}. Expiry: ${expiryDate.toISOString()}`);

      // 3. Ensure User account status is Active
      if (user.status !== 'Active') {
        user.status = 'Active';
        await user.save();
        console.log(`Webhook: User status updated to Active for user: ${userId}`);
      }

      // 4. Create Invoice Record
      const invoiceId = `INV-${Date.now().toString().substring(5)}`;
      const invoice = await Invoice.create({
        invoiceId,
        userId,
        paymentId,
        plan: `${normalizedPlan} Maintenance Plan`,
        amount: price,
        status: 'Paid',
        billingDate: new Date()
      });
      console.log(`Webhook: Invoice ${invoiceId} created successfully.`);

      // 5. Emit Socket Updates
      const io = req.app.get('io');
      if (io) {
        emitStats(io);
        emitUsersList(io);
        emitPaymentsList(io);
        console.log('Webhook: Socket.io statistics and list updates emitted.');
      }

      // 6. Send email notifications (safely catch errors to prevent server crash)
      mailService.sendPaymentNotification(user, normalizedPlan, price, invoiceId, paymentId)
        .catch(err => console.error('Error sending webhook payment notification mail:', err));
    }

    res.json({ success: true, status: 'processed' });
  } catch (error) {
    console.error('Error in Razorpay Webhook:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
