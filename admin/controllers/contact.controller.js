import Message from "../models/Message.js";
import { mailService } from "../services/mail.service.js";

/**
 * Controller to handle contact form submissions.
 * Saves the message to the database and sends a notification email.
 */
export const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // 1. Basic Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required (name, email, subject, message)."
    });
  }

  // 2. Email Configuration Check
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("CRITICAL: Email credentials missing in environment variables.");
      return res.status(500).json({
          success: false,
          message: "Email service is currently unavailable. Please try again later."
      });
  }

  try {
    // 3. Save message to Database
    const newMessage = new Message({
      name,
      email,
      subject,
      message
    });
    
    await newMessage.save();
    console.log(`Database: Saved message from ${name} (${email})`);

    // 4. Send Email Notification via Service
    await mailService.sendContactNotification({
        name,
        email,
        subject,
        message
    });

    // 5. Success Response
    return res.status(200).json({
      success: true,
      message: "Message sent and saved successfully. We will get back to you soon!"
    });

  } catch (error) {
    console.error("Controller Error (sendContactEmail):", {
      message: error.message,
      stack: error.stack
    });

    return res.status(500).json({
      success: false,
      message: "An internal error occurred while processing your request.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};
