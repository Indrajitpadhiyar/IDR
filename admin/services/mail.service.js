import { resendClient } from "../config/mailer.js";
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

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not defined in environment variables");
    }

    const recipient = process.env.EMAIL_USER || "idrtech23@gmail.com";
    
    // Resend requires a verified 'from' address. 
    // If not verified, onboarding@resend.dev must be used (to any recipient during testing)
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
