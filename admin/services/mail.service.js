import { transporter } from "../config/mailer.js";
import { getContactEmailTemplate } from "../templates/contact.template.js";

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

    if (!process.env.EMAIL_USER) {
      throw new Error("EMAIL_USER is not defined in environment variables");
    }

    const mailOptions = {
      from: `"IDR Tech Support" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email,
      subject: `New Lead: ${subject}`,
      html: getContactEmailTemplate(contactData),
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error("Error in mailService.sendContactNotification:", error);
      throw error;
    }
  },

  /**
   * Optional: Sends a thank you email to the user.
   */
  sendThankYouEmail: async (userName, userEmail) => {
    // Implementation placeholder if needed later
    console.log(`Would send thank you email to ${userEmail}`);
  }
};
