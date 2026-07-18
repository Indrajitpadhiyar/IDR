import nodemailer from "nodemailer";
import { resendClient } from "../config/mailer.js";
import { getContactEmailTemplate } from "../templates/contact.template.js";
import { getUserPaymentEmailTemplate, getAdminPaymentEmailTemplate } from "../templates/payment.template.js";

// Helper to create a Gmail transporter via Nodemailer for general deliverability
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "idrtech23@gmail.com",
      pass: process.env.EMAIL_PASS || "kfmiwypaurpzmuhn",
    },
  });
};

/**
 * Service to handle email sending logic.
 */
export const mailService = {
  /**
   * Sends a notification email to the site owner about a new contact submission.
   * @param {Object} contactData - The data submitted by the user.
   */
  sendContactNotification: async (contactData) => {
    const { email, subject } = contactData;

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing in env!");
      throw new Error("RESEND_API_KEY is not defined in environment variables");
    }
    console.log("Using Resend API Key starting with:", process.env.RESEND_API_KEY.substring(0, 6));

    const recipient = process.env.EMAIL_USER || "idrtech23@gmail.com";
    const fromAddress = "IDR TECH <onboarding@resend.dev>"; 

    try {
      const { data, error } = await resendClient.emails.send({
        from: fromAddress,
        to: [recipient],
        reply_to: email,
        subject: `New Lead: ${subject}`,
        html: getContactEmailTemplate(contactData),
      });

      if (error) {
        console.error("Resend API Error:", error);
        throw new Error(error.message);
      }

      console.log(`Email sent successfully via Resend: ${data.id}`);
      return data;
    } catch (error) {
      console.error("Error in mailService.sendContactNotification, falling back to Gmail SMTP:", error);
      
      // Fallback to Nodemailer Gmail SMTP if Resend fails/runs out of limit
      try {
        const transporter = createTransporter();
        const info = await transporter.sendMail({
          from: `"IDR TECH Form" <${process.env.EMAIL_USER}>`,
          to: recipient,
          replyTo: email,
          subject: `New Lead: ${subject}`,
          html: getContactEmailTemplate(contactData),
        });
        console.log(`Email sent successfully via Gmail SMTP backup: ${info.messageId}`);
        return { id: info.messageId };
      } catch (backupError) {
        console.error("Gmail SMTP fallback failed as well:", backupError);
        throw backupError;
      }
    }
  },

  /**
   * Sends payment confirmation notifications to the customer and the admin.
   * @param {Object} user - The customer data object.
   * @param {string} planName - Plan name (e.g. Basic, Professional, Enterprise)
   * @param {number} price - Plan price paid in INR
   * @param {string} invoiceId - Invoice reference number
   * @param {string} paymentId - Payment reference ID
   */
  sendPaymentNotification: async (user, planName, price, invoiceId, paymentId) => {
    const adminEmail = process.env.EMAIL_USER || "idrtech23@gmail.com";
    const transporter = createTransporter();

    console.log(`Preparing payment confirmation emails for ${user.email} and admin...`);

    // 1. Send confirmation email to Customer (User)
    const userMailOptions = {
      from: `"IDR TECH" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `Payment Confirmed: Your ${planName} AMC is Active!`,
      html: getUserPaymentEmailTemplate(user, planName, price, invoiceId, paymentId),
    };

    // 2. Send transaction notification to Admin
    const adminMailOptions = {
      from: `"IDR TECH Orders" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `[New Sale] ₹${price} received from ${user.firstName} for ${planName} AMC`,
      html: getAdminPaymentEmailTemplate(user, planName, price, invoiceId, paymentId),
    };

    // Run mail sending asynchronously to avoid blocking the API response
    Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]).then(([userInfo, adminInfo]) => {
      console.log(`Payment confirmation emails delivered successfully. User: ${userInfo.messageId}, Admin: ${adminInfo.messageId}`);
    }).catch(err => {
      console.error("Error sending payment confirmation emails asynchronously:", err);
    });
  },

  /**
   * Optional: Sends a thank you email to the user.
   */
  sendThankYouEmail: async (userName, userEmail) => {
    console.log(`Would send thank you email to ${userEmail}`);
  }
};
