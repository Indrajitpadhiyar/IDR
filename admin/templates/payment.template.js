/**
 * Generates a premium HTML email template for customer payment confirmations.
 * @param {Object} user - The customer data.
 * @param {string} planName - Name of the subscription plan.
 * @param {number} price - Amount paid.
 * @param {string} invoiceId - Invoice ID generated.
 * @param {string} paymentId - Razorpay payment reference ID.
 * @returns {string} - Complete HTML template.
 */
export const getUserPaymentEmailTemplate = (user, planName, price, invoiceId, paymentId) => {
  const year = new Date().getFullYear();
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Received - IDR TECH</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.05); border: 1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 40px; text-align: center; color: #ffffff; relative;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; tracking-tight: -0.05em; color: #ffffff;">IDR TECH</h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #38bdf8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em;">Payment Confirmed</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 45px 40px;">
              <h2 style="margin-top: 0; color: #0f172a; font-size: 22px; font-weight: 700; tracking-tight: -0.03em;">Thank you for your payment, ${user.firstName}!</h2>
              <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">We've successfully processed your payment. Your website maintenance Annual Maintenance Contract (AMC) is now active.</p>
              
              <!-- Invoice Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 16px; border: 1px solid #f1f5f9; padding: 25px; margin-bottom: 35px;">
                <tr>
                  <td colspan="2" style="font-weight: 800; font-size: 14px; text-transform: uppercase; tracking-spacing: 0.05em; color: #64748b; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;">Transaction Details</td>
                </tr>
                <tr>
                  <td style="padding: 15px 0 8px; color: #64748b; font-size: 14px; font-weight: 600;">Subscription Plan:</td>
                  <td style="padding: 15px 0 8px; color: #0f172a; font-size: 14px; font-weight: 700; text-align: right;">${planName} Maintenance</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Amount Charged:</td>
                  <td style="padding: 8px 0; color: #0b63f6; font-size: 16px; font-weight: 800; text-align: right;">₹${price.toLocaleString('en-IN')}.00</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Invoice Reference:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-family: monospace; font-weight: 600; text-align: right;">${invoiceId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 600;">Payment Transaction:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-family: monospace; font-weight: 600; text-align: right;">${paymentId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0 0; color: #64748b; font-size: 14px; font-weight: 600;">Billing Date:</td>
                  <td style="padding: 8px 0 0; color: #0f172a; font-size: 14px; font-weight: 700; text-align: right;">${dateStr}</td>
                </tr>
              </table>

              <!-- Value-adds info -->
              <h3 style="margin-top: 0; color: #0f172a; font-size: 16px; font-weight: 700; margin-bottom: 12px;">What happens next?</h3>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 30px; margin-top: 0;">Our DevOps team is monitoring your site. You can now access full configuration parameters, view invoices, and raise direct technical tickets through your customer portal.</p>

              <div style="text-align: center;">
                <a href="https://idrtech.in/login" style="background-color: #0b63f6; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(11, 99, 246, 0.2); transition: all 0.2s;">Access Client Portal</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-weight: 600;">You are receiving this because a payment was completed on your IDR TECH account.</p>
              <p style="margin: 6px 0 0;">&copy; ${year} IDR TECH. All rights reserved.</p>
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

/**
 * Generates a premium HTML email template for admin payment notifications.
 * @param {Object} user - The customer data.
 * @param {string} planName - Name of the subscription plan.
 * @param {number} price - Amount paid.
 * @param {string} invoiceId - Invoice ID generated.
 * @param {string} paymentId - Razorpay payment reference ID.
 * @returns {string} - Complete HTML template.
 */
export const getAdminPaymentEmailTemplate = (user, planName, price, invoiceId, paymentId) => {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New AMC Order Received - IDR TECH</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.05); border: 1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0b63f6, #00d2ff); padding: 40px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 800; tracking-tight: -0.05em; color: #ffffff;">IDR ADMIN CONSOLE</h1>
              <p style="margin: 8px 0 0; font-size: 13px; color: #ffffff; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; opacity: 0.9;">New Payment Alert</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 45px 40px;">
              <div style="background-color: #e0f2fe; color: #0369a1; border-radius: 12px; padding: 15px 20px; font-weight: 700; font-size: 15px; margin-bottom: 30px; display: inline-block;">
                New AMC order successfully received & activated!
              </div>

              <!-- User Information -->
              <h3 style="margin-top: 0; color: #0f172a; font-size: 16px; font-weight: 700; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 15px;">Client Information</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">Full Name:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${user.firstName} ${user.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email Address:</td>
                  <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${user.email}" style="color: #0b63f6; text-decoration: none; font-weight: 700;">${user.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${user.phone || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Company/Brand:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${user.company || 'Personal'}</td>
                </tr>
              </table>

              <!-- Order / Invoice Details -->
              <h3 style="margin-top: 0; color: #0f172a; font-size: 16px; font-weight: 700; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 15px;">Order & Pricing Details</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 35px; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">Plan:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${planName} Maintenance Plan</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Amount Paid:</td>
                  <td style="padding: 6px 0; color: #16a34a; font-weight: 800; font-size: 16px;">₹${price.toLocaleString('en-IN')}.00</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Invoice Reference:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-family: monospace; font-weight: 700;">${invoiceId}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Razorpay Order:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-family: monospace; font-weight: 700;">${paymentId}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Processed At:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${dateStr}</td>
                </tr>
              </table>

              <div style="text-align: center;">
                <a href="https://idrtech.in/admin/payments" style="background-color: #0b63f6; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(11, 99, 246, 0.2);">Open Admin Dashboard</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-weight: 600;">This is an automated server transaction notification.</p>
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
