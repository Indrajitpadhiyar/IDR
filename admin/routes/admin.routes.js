import express from "express";
import {
  getStats,
  getUsers,
  getUserDetails,
  updateUserStatus,
  extendSubscription,
  getPayments,
  getTickets,
  resolveTicket,
} from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get("/stats", getStats);
router.get("/users", getUsers);
router.get("/users/:id", getUserDetails);
router.put("/users/:id/status", updateUserStatus);
router.put("/subscriptions/:userId", extendSubscription);
router.get("/payments", getPayments);
router.get("/tickets", getTickets);
router.put("/tickets/:id/resolve", resolveTicket);

export default router;
