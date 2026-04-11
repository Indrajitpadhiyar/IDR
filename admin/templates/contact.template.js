/**
 * Generates a professional HTML email template for contact form submissions.
 * @param {Object} data - The data from the contact form submission.
 * @returns {string} - The complete HTML string.
 */
export const getContactEmailTemplate = (data) => {
    const { name, email, subject, message } = data;
    const year = new Date().getFullYear();

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; color: #333;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f9fc; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #4f46e5, #3b82f6); padding: 40px; text-align: center; color: #ffffff;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 700;">IDR TECH</h1>
                            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">New Form Submission</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="margin-top: 0; color: #1e293b; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">Submission Details</h2>
                            
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                                <tr>
                                    <td style="padding: 10px 0; color: #64748b; width: 120px; font-weight: 600;">Sender Name:</td>
                                    <td style="padding: 10px 0; color: #1e293b; font-weight: 500;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #64748b; width: 120px; font-weight: 600;">Email Address:</td>
                                    <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">${email}</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #64748b; width: 120px; font-weight: 600;">Subject:</td>
                                    <td style="padding: 10px 0; color: #1e293b; font-weight: 500;">${subject}</td>
                                </tr>
                            </table>

                            <div style="margin-top: 30px; background-color: #f8fafc; border-radius: 8px; padding: 25px; border-left: 4px solid #4f46e5;">
                                <h3 style="margin-top: 0; font-size: 16px; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Message</h3>
                                <p style="margin-bottom: 0; line-height: 1.6; color: #334155; white-space: pre-line;">${message}</p>
                            </div>

                            <div style="margin-top: 40px; text-align: center;">
                                <a href="mailto:${email}" style="background-color: #4f46e5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block;">Reply to Message</a>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f1f5f9; padding: 25px; text-align: center; color: #94a3b8; font-size: 13px;">
                            <p style="margin: 0;">This email was sent via the IDR TECH Contact Form.</p>
                            <p style="margin: 5px 0 0;">&copy; ${year} IDR TECH. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};
