import dotenv from "dotenv";
import nodemailer from "nodemailer";

// ensure environment variables are loaded even if this module is imported early
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use TLS for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});
