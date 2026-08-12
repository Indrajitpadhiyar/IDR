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

// Actual plan pricing map
const REAL_PLAN_PRICES = {
  Basic: 2999,
  Professional: 7999,
  Enterprise: 19999
};

// Helper to retrieve and clean Cashfree credentials and compute endpoints
const getCashfreeCredentials = () => {
  const keyId = (process.env.CASEFREE_KEY_ID || process.env.CASHFREE_CLIENT_ID || '').replace(/^"(.*)"$/, '$1').trim();
  const keySecret = (process.env.CASEFREE_KEY_SECRET || process.env.CASHFREE_CLIENT_SECRET || '').replace(/^"(.*)"$/, '$1').trim();
  
  const isProd = keyId && !keyId.toUpperCase().startsWith('TEST');
  const baseUrl = isProd ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';
  
  return { keyId, keySecret, isProd, baseUrl };
};

// Dynamic plan pricing helper based on Cashfree Mode
const getPlanPrice = (planName, keyId) => {
  const normalized = normalizePlanName(planName);
  const realPrice = REAL_PLAN_PRICES[normalized] || 2999;
  
  // Check if Cashfree is in test mode (starts with TEST)
  const isTestKey = (keyId || '').toLowerCase().startsWith('test');
  
  // Check if amount override is disabled by setting CASHFREE_TEST_AMOUNT_OVERRIDE=false
  const overrideTestAmount = process.env.CASHFREE_TEST_AMOUNT_OVERRIDE !== 'false';
  
  if (isTestKey && overrideTestAmount) {
    console.log(`Cashfree is in Test Mode and override is active. Using test price ₹1 for ${normalized} Plan.`);
    return 1; // ₹1 for manual testing
  }
  
  return realPrice;
};

// Plan limits map
const PLAN_LIMITS = {
  Basic: { storageLimit: 50, bandwidthLimit: '500 GB' },
  Professional: { storageLimit: 100, bandwidthLimit: 'Unlimited' },
  Enterprise: { storageLimit: 200, bandwidthLimit: 'Unlimited' }
};

/**
 * Initiates a new Cashfree order checkout.
 */
export const createOrder = async (req, res) => {
  try {
    const { planName } = req.body;
    const normalizedPlan = normalizePlanName(planName);

    const { keyId, keySecret, isProd, baseUrl } = getCashfreeCredentials();

    if (!keyId || !keySecret) {
      console.error('Cashfree credentials missing in env variables!');
      return res.status(500).json({ success: false, message: 'Payment gateway configuration is currently missing' });
    }

    const price = getPlanPrice(normalizedPlan, keyId);

    // Sanitize phone number (Cashfree requires a valid digit-only phone number, min 10 digits)
    const cleanPhone = (req.user.phone || '').replace(/\D/g, '');
    const customerPhone = cleanPhone.length >= 10 ? cleanPhone.substring(cleanPhone.length - 10) : '9999999999';

    // Construct return URL pointing to dashboard subscription verification
    const origin = req.headers.origin || 'http://localhost:5173';
    const returnUrl = `${origin}/dashboard/subscription?order_id={order_id}`;

    const requestBody = {
      order_amount: price,
      order_currency: 'INR',
      order_id: `ord_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`,
      customer_details: {
        customer_id: req.user._id.toString(),
        customer_phone: customerPhone,
        customer_email: req.user.email || 'guest@idrtech.in',
        customer_name: `${req.user.firstName || ''} ${req.user.lastName || ''}`.trim() || 'Guest User'
      },
      order_meta: {
        return_url: returnUrl
      },
      order_tags: {
        userId: req.user._id.toString(),
        planName: normalizedPlan
      }
    };

    console.log(`Creating Cashfree Order for client ${req.user._id} (${normalizedPlan} Plan)...`);
    
    const response = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': keyId,
        'x-client-secret': keySecret
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Cashfree API Error during order creation: Status ${response.status}`, errorText);
      return res.status(response.status).json({ success: false, message: 'Failed to create Cashfree order' });
    }

    const order = await response.json();

    res.json({
      success: true,
      order: {
        id: order.order_id,
        amount: order.order_amount,
        currency: order.order_currency,
        payment_session_id: order.payment_session_id
      },
      isSandbox: !isProd
    });
  } catch (error) {
    console.error('Error creating Cashfree order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Verifies payment status and processes database updates and notifications.
 */
export const verifyPayment = async (req, res) => {
  try {
    const { order_id } = req.body;

    if (!order_id) {
      return res.status(400).json({ success: false, message: 'Missing order_id parameter' });
    }

    const { keyId, keySecret, isProd, baseUrl } = getCashfreeCredentials();

    if (!keyId || !keySecret) {
      console.error('Cashfree credentials missing in env variables!');
      return res.status(500).json({ success: false, message: 'Payment gateway configuration is currently missing' });
    }

    // 1. Fetch order details from Cashfree
    console.log(`Verifying payment for Cashfree Order ID: ${order_id}...`);
    const orderResponse = await fetch(`${baseUrl}/orders/${order_id}`, {
      method: 'GET',
      headers: {
        'x-api-version': '2023-08-01',
        'x-client-id': keyId,
        'x-client-secret': keySecret
      }
    });

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      console.error(`Cashfree API Error during order retrieval: Status ${orderResponse.status}`, errorText);
      return res.status(400).json({ success: false, message: 'Failed to retrieve order status from Cashfree' });
    }

    const orderData = await orderResponse.json();
    console.log(`Cashfree Order Status for ${order_id}:`, orderData.order_status);

    if (orderData.order_status !== 'PAID') {
      return res.status(400).json({ 
        success: false, 
        message: `Payment not completed. Current status: ${orderData.order_status}` 
      });
    }

    // Retrieve userId and plan details from order tags
    const userId = orderData.order_tags?.userId || req.user?._id?.toString();
    const planName = orderData.order_tags?.planName || 'Basic';

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User identification details not found' });
    }

    // 2. Fetch payment ID from the payments array
    let paymentId = `PAY-${order_id}`;
    try {
      const paymentsResponse = await fetch(`${baseUrl}/orders/${order_id}/payments`, {
        method: 'GET',
        headers: {
          'x-api-version': '2023-08-01',
          'x-client-id': keyId,
          'x-client-secret': keySecret
        }
      });
      if (paymentsResponse.ok) {
        const payments = await paymentsResponse.json();
        const successPayment = payments.find(p => p.payment_status === 'SUCCESS');
        if (successPayment) {
          paymentId = successPayment.cf_payment_id;
        }
      }
    } catch (payErr) {
      console.error('Error fetching payments list (using fallback ID):', payErr);
    }

    // Avoid double processing
    const existingInvoice = await Invoice.findOne({ paymentId });
    if (existingInvoice) {
      console.log(`Payment ${paymentId} already processed.`);
      return res.json({
        success: true,
        message: 'Payment verified and subscription activated successfully',
        invoice: existingInvoice
      });
    }

    const normalizedPlan = normalizePlanName(planName);
    const price = orderData.order_amount;
    const limit = PLAN_LIMITS[normalizedPlan];

    // Calculate Expiry Date (extend if current is active)
    let sub = await Subscription.findOne({ userId });
    const currentDate = new Date();
    let expiryDate = new Date();

    if (sub && sub.status === 'Active' && sub.expiry > currentDate) {
      expiryDate.setTime(new Date(sub.expiry).getTime() + (365 * 24 * 60 * 60 * 1000));
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    // Create or Update Subscription
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
    console.log(`Subscription updated in DB for client ${userId}. Expiry: ${expiryDate.toISOString()}`);

    // Ensure User account status is Active
    const userObj = await User.findById(userId);
    if (userObj && userObj.status !== 'Active') {
      userObj.status = 'Active';
      await userObj.save();
      console.log(`User status updated to Active for user: ${userId}`);
    }

    // Create Invoice Record
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
    console.log(`Invoice ${invoiceId} created successfully.`);

    // Emit Socket Updates
    const io = req.app.get('io');
    if (io) {
      emitStats(io);
      emitUsersList(io);
      emitPaymentsList(io);
      console.log('Socket.io statistics and list updates emitted.');
    }

    // Send email notifications
    if (userObj) {
      mailService.sendPaymentNotification(userObj, normalizedPlan, price, invoiceId, paymentId)
        .catch(err => console.error('Error sending payment notification mail:', err));
    }

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
 * Webhook handler called directly by Cashfree's servers.
 * Verifies webhook signature and processes payment/activation asynchronously.
 */
export const cashfreeWebhook = async (req, res) => {
  try {
    const { keySecret } = getCashfreeCredentials();

    if (!keySecret) {
      console.error('Cashfree credentials missing in env variables for webhook verification!');
      return res.status(500).json({ success: false, message: 'Credentials missing' });
    }

    const signature = req.headers['x-webhook-signature'];
    const timestamp = req.headers['x-webhook-timestamp'];
    
    if (!signature || !timestamp) {
      console.warn('Webhook received without signature or timestamp headers!');
      return res.status(400).json({ success: false, message: 'Missing headers' });
    }

    const rawBody = req.rawBody ? req.rawBody.toString('utf-8') : JSON.stringify(req.body);
    
    // Verify Cashfree Webhook signature
    const signatureData = timestamp + rawBody;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(signatureData)
      .digest('base64');

    if (signature !== expectedSignature) {
      console.warn('Cashfree webhook signature verification failed!');
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const parsedEvent = req.body;
    console.log(`Cashfree webhook event received: ${parsedEvent.type}`);

    // If payment is successful
    if (parsedEvent.type === 'PAYMENT_SUCCESS_WEBHOOK') {
      const dataObj = parsedEvent.data?.object;
      if (!dataObj) {
        console.warn('Webhook PAYMENT_SUCCESS_WEBHOOK body has missing data object');
        return res.json({ status: 'ok' });
      }

      const orderId = dataObj.order_id;
      const paymentId = dataObj.cf_payment_id;
      const amount = dataObj.order_amount;
      const orderTags = dataObj.order_tags;

      if (!orderTags || !orderTags.userId || !orderTags.planName) {
        console.warn(`Webhook ignored: Order ${orderId} does not contain metadata tags.`);
        return res.json({ status: 'ok' });
      }

      const { userId, planName } = orderTags;

      // Check if invoice already processed
      const existingInvoice = await Invoice.findOne({ paymentId });
      if (existingInvoice) {
        console.log(`Webhook: Payment ${paymentId} already processed.`);
        return res.json({ success: true, message: 'Already processed' });
      }

      const normalizedPlan = normalizePlanName(planName);
      const limit = PLAN_LIMITS[normalizedPlan];

      const userObj = await User.findById(userId);
      if (!userObj) {
        console.error(`Webhook error: User ${userId} not found in DB!`);
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Calculate Expiry Date
      let sub = await Subscription.findOne({ userId });
      const currentDate = new Date();
      let expiryDate = new Date();

      if (sub && sub.status === 'Active' && sub.expiry > currentDate) {
        expiryDate.setTime(new Date(sub.expiry).getTime() + (365 * 24 * 60 * 60 * 1000));
      } else {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      }

      // Create or Update Subscription
      if (!sub) {
        sub = new Subscription({
          userId,
          plan: normalizedPlan,
          price: amount,
          expiry: expiryDate,
          status: 'Active',
          storageLimit: limit.storageLimit,
          storageUsed: 0,
          bandwidthLimit: limit.bandwidthLimit
        });
      } else {
        sub.plan = normalizedPlan;
        sub.price = amount;
        sub.expiry = expiryDate;
        sub.status = 'Active';
        sub.storageLimit = limit.storageLimit;
        sub.bandwidthLimit = limit.bandwidthLimit;
      }
      await sub.save();
      console.log(`Webhook: Subscription updated in DB for client ${userId}. Expiry: ${expiryDate.toISOString()}`);

      // Ensure User account status is Active
      if (userObj.status !== 'Active') {
        userObj.status = 'Active';
        await userObj.save();
      }

      // Create Invoice Record
      const invoiceId = `INV-${Date.now().toString().substring(5)}`;
      const invoice = await Invoice.create({
        invoiceId,
        userId,
        paymentId,
        plan: `${normalizedPlan} Maintenance Plan`,
        amount,
        status: 'Paid',
        billingDate: new Date()
      });
      console.log(`Webhook: Invoice ${invoiceId} created successfully.`);

      // Emit Socket Updates
      const io = req.app.get('io');
      if (io) {
        emitStats(io);
        emitUsersList(io);
        emitPaymentsList(io);
      }

      // Send email notifications
      mailService.sendPaymentNotification(userObj, normalizedPlan, amount, invoiceId, paymentId)
        .catch(err => console.error('Error sending webhook payment notification mail:', err));
    }

    res.json({ success: true, status: 'processed' });
  } catch (error) {
    console.error('Error in Cashfree Webhook:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fallback alias export to prevent server import errors if referenced elsewhere
export const razorpayWebhook = cashfreeWebhook;
