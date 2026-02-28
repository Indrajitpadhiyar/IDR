import { transporter } from "../config/mailer.js";

export const sendeContactEmail = async (req, res) => {
  try {
    const { email, name, subject, message } = req.body;

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);
    if (error.code === 'EAUTH') {
      return res.status(401).json({
        success: false,
        message: "Invalid email credentials. Please check your App Password.",
      });
    }
    res.status(500).json({
      success: false,
      message: "Email failed to send. Please try again later.",
    });
  }
};
