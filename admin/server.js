import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.routes.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Root / Diagnostic route (Must be above DB connection to prevent 502 if DB fails)
app.get("/", (req, res) => {
  const diagnostics = {
    server: "running",
    env: {
      MONGO_URL: process.env.MONGO_URL ? "defined" : "MISSING",
      EMAIL_USER: process.env.EMAIL_USER ? "defined" : "MISSING",
      EMAIL_PASS: process.env.EMAIL_PASS ? "defined" : "MISSING",
      PORT: process.env.PORT || "default:4000"
    },
    dbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    dbReadyState: mongoose.connection.readyState // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
  };
  res.json(diagnostics);
});

// Routes
app.use("/api/contact", contactRoutes);

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
    console.error("WARNING: MONGO_URL is missing. DB functionality will fail.");
  }
});
