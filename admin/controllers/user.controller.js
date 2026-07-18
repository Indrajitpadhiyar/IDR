import Invoice from '../models/Invoice.js';
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import { emitStats, emitTicketsList } from '../config/socket.js';

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, company, address } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    if (name) {
      const parts = name.split(' ');
      user.firstName = parts[0] || user.firstName;
      user.lastName = parts.slice(1).join(' ') || user.lastName;
    }

    user.phone = phone || user.phone;
    user.company = company !== undefined ? company : user.company;
    user.address = address !== undefined ? address : user.address;

    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        company: user.company,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTicket = async (req, res) => {
  try {
    const { subject, priority, message } = req.body;

    const count = await Ticket.countDocuments();
    const ticketId = `TKT-${String(count + 1).padStart(3, '0')}`;

    const ticket = await Ticket.create({
      ticketId,
      userId: req.user._id,
      subject,
      priority,
      message,
    });

    const io = req.app.get('io');
    if (io) {
      emitStats(io);
      emitTicketsList(io);
    }

    res.status(201).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
