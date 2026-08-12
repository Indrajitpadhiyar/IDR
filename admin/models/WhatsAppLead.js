import mongoose from "mongoose";

const conversationMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["client", "ai", "admin"],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  whatsappMessageId: {
    type: String,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const whatsAppLeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  company: {
    type: String,
    trim: true,
    default: ""
  },
  industry: {
    type: String,
    trim: true,
    default: "General Business"
  },
  serviceInterested: {
    type: String,
    trim: true,
    default: "Web & Software Development"
  },
  status: {
    type: String,
    enum: ["pending", "approached", "replied", "converted", "opted_out"],
    default: "pending"
  },
  lastPitch: {
    type: String,
    default: ""
  },
  lastContactedAt: {
    type: Date,
    default: null
  },
  customNotes: {
    type: String,
    default: ""
  },
  conversationHistory: [conversationMessageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

whatsAppLeadSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const WhatsAppLead = mongoose.model("WhatsAppLead", whatsAppLeadSchema);

export default WhatsAppLead;
