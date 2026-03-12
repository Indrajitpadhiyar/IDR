import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Diagnostic helper
const getDiagnostics = () => ({
  server: "running",
  status: "perfect",
  env: {
    MONGO_URL: process.env.MONGO_URL ? "defined" : "MISSING",
    EMAIL_USER: process.env.EMAIL_USER ? "defined" : "MISSING",
    EMAIL_PASS: process.env.EMAIL_PASS ? "defined" : "MISSING",
    PORT: process.env.PORT || "default:4000"
  },
  dbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  dbReadyState: mongoose.connection.readyState // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
});

// Root route
app.get("/", (req, res) => {
  res.json(getDiagnostics());
});

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

// Admin Routes
app.use("/api/admin", adminRoutes);

// Start Server immediately
app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);

  // Trigger DB connection AFTER server is listening
  if (process.env.MONGO_URL) {
    mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("DB is connected");
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
