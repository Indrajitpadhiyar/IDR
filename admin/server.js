import dotenv from "dotenv";
import dns from "dns";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import contactRoutes from "./routes/contact.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import whatsappRoutes from "./routes/whatsapp.routes.js";
import { cashfreeWebhook } from "./controllers/payment.controller.js";
import { verifyWebhook, handleWebhook } from "./controllers/whatsapp.controller.js";
import mongoose from "mongoose";
import { initSocket } from "./config/socket.js";
import { seedDatabase } from "./config/seed.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Create HTTP server wrapping Express
const httpServer = createServer(app);

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Set io globally on the app
app.set("io", io);

initSocket(io);

// Middleware
app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// Diagnostic helper
const getDiagnostics = () => ({
  server: "running",
  status: "perfect",
  env: {
    MONGO_URL: process.env.MONGO_URL ? "defined" : "MISSING",
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "defined" : "MISSING",
    EMAIL_USER: process.env.EMAIL_USER ? "defined" : "MISSING",
    WHATSAPP_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN ? "defined" : "MISSING",
    WHATSAPP_PHONE_ID: process.env.WHATSAPP_PHONE_NUMBER_ID ? "defined" : "MISSING",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? "defined" : "MISSING",
    PORT: process.env.PORT || "default:4000"
  },
  dbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  dbReadyState: mongoose.connection.readyState // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
});

// Root route (Also supports direct Meta Webhook verification if root URL is passed as Callback URL)
app.get("/", (req, res) => {
  if (req.query["hub.mode"]) {
    return verifyWebhook(req, res);
  }
  res.json(getDiagnostics());
});
app.post("/", (req, res, next) => {
  if (req.body?.object === "whatsapp_business_account") {
    return handleWebhook(req, res);
  }
  next();
});

// Root-level /webhook shortcut routes
app.get("/webhook", verifyWebhook);
app.post("/webhook", handleWebhook);

// Support all variations: contact, contect, api/contact, api/contect
const routes = ["/contact", "/contect", "/api/contact", "/api/contect"];

routes.forEach(path => {
  // Handle GET for diagnosis
  app.get(path, (req, res) => {
    res.json({
      message: `API is active at ${path}. Use POST to send messages.`,
      diagnostics: getDiagnostics()
    });
  });
  // Handle POST for the form
  app.use(path, contactRoutes);
});

// Razorpay Webhook (Public, bypassed authentication)
app.post("/api/payments/webhook", cashfreeWebhook);

// Authentication and User Dashboard Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// WhatsApp Outreach & AI Automation Routes
app.use("/api/whatsapp", whatsappRoutes);


// Start Server immediately
httpServer.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);

  // Trigger DB connection AFTER server is listening
  if (process.env.MONGO_URL) {
    mongoose.connect(process.env.MONGO_URL).then(async () => {
      console.log("DB is connected");
      // Seed database if empty
      await seedDatabase();
    }).catch((err) => {
      console.error("DB connection error (Server is still running):", {
        message: err.message,
        code: err.code
      });
    });
  } else {
    console.warn("WARNING: MONGO_URL is missing. DB functionality will be limited.");
  }
});
