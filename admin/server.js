import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.routes.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 4000;

// DB connection
// Add environment variable check for MONGO_URL
if (!process.env.MONGO_URL) {
  console.error("FATAL ERROR: MONGO_URL environment variable is not defined.");
  process.exit(1); // Exit the application if critical env var is missing
}

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("DB is connected");
}).catch((err) => {
  // Detailed error logging for DB connection
  console.error("DB connection error:", {
    message: err.message,
    name: err.name,
    code: err.code,
    stack: err.stack
  });
  process.exit(1); // Exit the application if DB connection fails
});

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.get("/", (req, res) => {
  // Add environment variable checks for EMAIL_USER and EMAIL_PASS
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("WARNING: EMAIL_USER or EMAIL_PASS environment variables are not defined. Email functionality might be impaired.");
  }

  const diagnostics = {
    server: "running",
    env: {
      MONGO_URL: process.env.MONGO_URL ? "defined" : "MISSING",
      EMAIL_USER: process.env.EMAIL_USER ? "defined" : "MISSING",
      EMAIL_PASS: process.env.EMAIL_PASS ? "defined" : "MISSING",
      PORT: process.env.PORT || "default:4000"
    },
    dbStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  };
  res.json(diagnostics);
});

app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});
