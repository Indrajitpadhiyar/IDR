import express from 'express';
import { updateProfile, getInvoices, getTickets, createTicket } from '../controllers/user.controller.js';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Apply protect to all user routes

router.put('/profile', updateProfile);
router.get('/invoices', getInvoices);
router.get('/tickets', getTickets);
router.post('/tickets', createTicket);

// Payment Integration
router.post('/payments/create-order', createOrder);
router.post('/payments/verify-payment', verifyPayment);

export default router;
