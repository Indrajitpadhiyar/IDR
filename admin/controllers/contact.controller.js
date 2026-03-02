import { transporter } from "../config/mailer.js";

export const sendContactEmail = async (req, res) => {
  const { email, name, subject, message } = req.body;

  // quick configuration sanity check
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("EMAIL credentials missing in environment","EMAIL_USER",process.env.EMAIL_USER ? "*set*" : "<empty>","EMAIL_PASS",process.env.EMAIL_PASS ? "*set*" : "<empty>");
    return res.status(500).json({
      success: false,
      message: "Email server is not configured. Please contact the administrator."
    });
  }

  // 1. Instant Response to Frontend
  res.status(200).json({
    success: true,
    message: "Request received. Sending message in background...",
  });

  // 2. Background Processing (Non-blocking)
  (async () => {
    try {
      const mailOptions = {
        // Use the authenticated email for "from" to avoid Gmail blocking the request
        from: process.env.EMAIL_USER,
        replyTo: email,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:30px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 25px rgba(0,0,0,0.08);">
                  <tr>
                    <td style="background:linear-gradient(135deg,#6366f1,#4f46e5);padding:25px;text-align:center;color:#fff;">
                      <h2 style="margin:0;font-weight:600;">New Contact Message</h2>
                      <p style="margin:5px 0 0;font-size:14px;opacity:.9;">You received a new form submission</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:30px 35px;color:#333;line-height:1.6;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;">
                        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;"><b style="color:#6b7280;">Name:</b><br/>${name}</td></tr>
                        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;"><b style="color:#6b7280;">Email:</b><br/><a href="mailto:${email}" style="color:#4f46e5;text-decoration:none;">${email}</a></td></tr>
                        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;"><b style="color:#6b7280;">Subject:</b><br/>${subject}</td></tr>
                        <tr><td style="padding:15px 0;"><b style="color:#6b7280;">Message:</b><div style="margin-top:8px;padding:15px;background:#f9fafb;border-radius:8px;">${message}</div></td></tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f9fafb;padding:20px;text-align:center;font-size:13px;color:#6b7280;">
                      <p style="margin:0;">This email was sent from your website contact form</p>
                      <p style="margin:5px 0 0;">© ${new Date().getFullYear()} IDR Tech</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`SUCCESS: Background email sent to ${process.env.EMAIL_USER} for subject: ${subject}`);
    } catch (error) {
      console.error("BACKGROUND EMAIL ERROR:", {
        message: error.message,
        code: error.code,
        command: error.command,
        stack: error.stack
      });
    }
  })();
};
