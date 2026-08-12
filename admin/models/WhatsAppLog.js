import mongoose from "mongoose";

const whatsAppLogSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  direction: {
    type: String,
    enum: ["outbound", "inbound"],
    required: true
  },
  messageType: {
    type: String,
    enum: ["text", "pitch", "ai_reply", "template", "media", "system"],
    default: "text"
  },
  messageContent: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "read", "failed", "received"],
    default: "sent"
  },
  whatsappMessageId: {
    type: String,
    default: null
  },
  errorDetails: {
    type: Object,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const WhatsAppLog = mongoose.model("WhatsAppLog", whatsAppLogSchema);

export default WhatsAppLog;
