import dotenv from "dotenv";
dotenv.config();

const GRAPH_API_VERSION = "v21.0";

/**
 * Normalizes phone number into international digit-only string (e.g. 919876543210)
 */
export const normalizePhoneNumber = (phone) => {
  if (!phone) return "";
  let cleaned = String(phone).replace(/\D/g, "");
  // If 10 digits (India local), default prepend country code 91
  if (cleaned.length === 10) {
    cleaned = "91" + cleaned;
  }
  return cleaned;
};

/**
 * Sends a WhatsApp text message using Meta Cloud API v21.0
 */
export const sendTextMessage = async (toPhoneNumber, messageText) => {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneId) {
    throw new Error("WhatsApp Cloud API credentials (WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID) are missing in environment.");
  }

  const recipientPhone = normalizePhoneNumber(toPhoneNumber);
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhone,
    type: "text",
    text: {
      preview_url: false,
      body: messageText
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("WhatsApp API Error Response:", data);
    const errorMessage = data.error?.message || data.error?.error_data?.details || "Failed to send WhatsApp message";
    throw new Error(`WhatsApp API Error (${data.error?.code || response.status}): ${errorMessage}`);
  }

  return data;
};

/**
 * Sends a WhatsApp Template message using Meta Cloud API v21.0
 */
export const sendTemplateMessage = async (toPhoneNumber, templateName, languageCode = "en_US", components = []) => {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneId) {
    throw new Error("WhatsApp Cloud API credentials missing.");
  }

  const recipientPhone = normalizePhoneNumber(toPhoneNumber);
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: recipientPhone,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: languageCode
      },
      components: components
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.error?.message || "Failed to send WhatsApp template message";
    throw new Error(`WhatsApp Template API Error: ${errorMessage}`);
  }

  return data;
};

/**
 * Marks incoming message as read
 */
export const markMessageAsRead = async (messageId) => {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneId || !messageId) return;

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneId}/messages`;
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId
      })
    });
  } catch (err) {
    console.warn("Could not mark message as read:", err.message);
  }
};
