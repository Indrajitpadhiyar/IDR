import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import Invoice from '../models/Invoice.js';
import Ticket from '../models/Ticket.js';

// Calculate and emit global stats
export const emitStats = async (io) => {
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
      expiry: { $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    });

    const stats = {
      totalUsers,
      yearlyPlans: yearlyCount,
      monthlyPlans: monthlyCount,
      revenue: `₹${revenueSum.toLocaleString('en-IN')}`,
      pendingRenewals,
      expiredPlans,
    };

    io.emit('stats_updated', stats);
  } catch (error) {
    console.error('Error emitting stats:', error.message);
  }
};

// Fetch and emit user list to all connected clients/admins
export const emitUsersList = async (io) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
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
          planPrice: sub ? sub.price : 0,
          expiry: sub ? sub.expiry.toISOString().split('T')[0] : 'N/A',
        };
      })
    );

    io.emit('users_updated', enrichedUsers);
  } catch (error) {
    console.error('Error emitting users:', error.message);
  }
};

// Fetch and emit invoices/payments log
export const emitPaymentsList = async (io) => {
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

    io.emit('payments_updated', payments);
  } catch (error) {
    console.error('Error emitting payments:', error.message);
  }
};

// Fetch and emit global tickets log
export const emitTicketsList = async (io) => {
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

    io.emit('tickets_updated', mappedTickets);
  } catch (error) {
    console.error('Error emitting tickets:', error.message);
  }
};

// Handle socket.io connection logic
export const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Immediately send initial states
    emitStats(io);
    emitUsersList(io);
    emitPaymentsList(io);
    emitTicketsList(io);

    // Event listener for active ticket creation or status modifications
    socket.on('request_refresh', () => {
      console.log('Socket requested state refresh...');
      emitStats(io);
      emitUsersList(io);
      emitPaymentsList(io);
      emitTicketsList(io);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
