import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import Invoice from '../models/Invoice.js';
import Ticket from '../models/Ticket.js';
import { emitStats, emitUsersList, emitTicketsList } from '../config/socket.js';

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const activeSubs = await Subscription.find({ status: 'Active' });

    let yearlyCount = 0;
    let monthlyCount = 0;
    activeSubs.forEach((sub) => {
      if (sub.plan === 'Basic' || sub.plan === 'Enterprise' || sub.plan === 'Yearly') {
        yearlyCount++;
      } else {
        monthlyCount++;
      }
    });

    const successfulInvoices = await Invoice.find({ status: 'Paid' });
    const revenueSum = successfulInvoices.reduce((sum, inv) => sum + inv.amount, 0);

    const expiredPlans = await Subscription.countDocuments({ status: 'Expired' });
    const pendingRenewals = await Subscription.countDocuments({
      status: 'Active',
      expiry: { $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }, // Expires within 30 days
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        yearlyPlans: yearlyCount,
        monthlyPlans: monthlyCount,
        revenue: `₹${revenueSum.toLocaleString('en-IN')}`,
        pendingRenewals,
        expiredPlans,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { role: 'user' };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(query).select('-password');
    const enrichedUsers = await Promise.all(
      users.map(async (u) => {
        const sub = await Subscription.findOne({ userId: u._id });
        return {
          id: u._id,
          firstName: u.firstName,
          lastName: u.lastName,
          name: `${u.firstName} ${u.lastName}`,
          email: u.email,
          phone: u.phone,
          company: u.company,
          status: u.status,
          role: u.role,
          plan: sub ? sub.plan : 'None',
          expiry: sub ? sub.expiry.toISOString().split('T')[0] : 'N/A',
        };
      })
    );

    res.json({ success: true, users: enrichedUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await User.findById(id).select('-password');
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const subscription = await Subscription.findOne({ userId: client._id });
    const invoices = await Invoice.find({ userId: client._id }).sort({ createdAt: -1 });
    const tickets = await Ticket.find({ userId: client._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      details: {
        user: client,
        subscription,
        invoices,
        tickets,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const client = await User.findById(id);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    client.status = status;
    await client.save();

    const io = req.app.get('io');
    if (io) {
      emitStats(io);
      emitUsersList(io);
    }

    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const extendSubscription = async (req, res) => {
  try {
    const { userId } = req.params;
    const sub = await Subscription.findOne({ userId });
    if (!sub) {
      return res.status(404).json({ success: false, message: 'Subscription record not found' });
    }

    const currentExpiry = new Date(sub.expiry);
    currentExpiry.setMonth(currentExpiry.getMonth() + 6); // Add 6 months
    sub.expiry = currentExpiry;
    sub.status = 'Active';

    await sub.save();

    const io = req.app.get('io');
    if (io) {
      emitStats(io);
      emitUsersList(io);
    }

    res.json({ success: true, expiry: sub.expiry.toISOString().split('T')[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('userId', 'firstName lastName email').sort({ createdAt: -1 });
    const payments = invoices.map((inv) => ({
      id: inv.invoiceId,
      user: inv.userId ? `${inv.userId.firstName} ${inv.userId.lastName}` : 'System User',
      amount: `₹${inv.amount.toLocaleString('en-IN')}`,
      method: 'UPI',
      status: inv.status === 'Paid' ? 'Successful' : inv.status,
      date: inv.billingDate.toISOString().split('T')[0],
    }));

    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('userId', 'firstName lastName email').sort({ createdAt: -1 });
    const mappedTickets = tickets.map((t) => ({
      id: t.ticketId,
      user: t.userId ? `${t.userId.firstName} ${t.userId.lastName}` : 'System User',
      subject: t.subject,
      priority: t.priority,
      createdAt: t.createdAt.toISOString().split('T')[0],
      status: t.status,
    }));

    res.json({ success: true, tickets: mappedTickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resolveTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findOne({ ticketId: id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    ticket.status = 'Resolved';
    await ticket.save();

    const io = req.app.get('io');
    if (io) {
      emitStats(io);
      emitTicketsList(io);
    }

    res.json({ success: true, message: 'Ticket marked as resolved' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
