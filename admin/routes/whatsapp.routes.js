import express from "express";
import {
  generatePitch,
  sendPitch,
  bulkOutreach,
  getLeads,
  createLead,
  deleteLead,
  getInquiries,
  getLogs,
  verifyWebhook,
  handleWebhook
} from "../controllers/whatsapp.controller.js";

const router = express.Router();

// AI & Outreach Routes
router.post("/generate-pitch", generatePitch);
router.post("/send-pitch", sendPitch);
router.post("/bulk-outreach", bulkOutreach);

// Lead Management & Inquiry Logs Routes
router.get("/leads", getLeads);
router.post("/leads", createLead);
router.delete("/leads/:id", deleteLead);
router.get("/inquiries", getInquiries);
router.get("/logs", getLogs);

// Meta Cloud API Webhook Verification & Listener
router.get("/webhook", verifyWebhook);
router.post("/webhook", handleWebhook);

export default router;

