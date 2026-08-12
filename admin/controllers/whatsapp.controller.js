import WhatsAppLead from "../models/WhatsAppLead.js";
import WhatsAppLog from "../models/WhatsAppLog.js";
import { sendTextMessage, normalizePhoneNumber, markMessageAsRead } from "../services/whatsapp.service.js";
import { generateClientPitch, generateAIResponse } from "../services/gemini.service.js";

/**
 * Generate AI-powered customized client outreach pitch
 */
export const generatePitch = async (req, res) => {
  try {
    const { name, company, industry, serviceInterested, customNotes } = req.body;

    const pitch = await generateClientPitch({
      name,
      company,
      industry,
      serviceInterested,
      customNotes
    });

    res.json({
      success: true,
      pitch
    });
  } catch (error) {
    console.error("Error in generatePitch:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate client pitch."
    });
  }
};

/**
 * Send customized pitch or message to a specific client via WhatsApp
 */
export const sendPitch = async (req, res) => {
  try {
    const { phoneNumber, pitchText, name, company, industry, serviceInterested, customNotes } = req.body;

    if (!phoneNumber || !pitchText) {
      return res.status(400).json({
        success: false,
        message: "phoneNumber and pitchText are required."
      });
    }

    const normalizedPhone = normalizePhoneNumber(phoneNumber);

    // Send WhatsApp message
    const apiResult = await sendTextMessage(normalizedPhone, pitchText);
    const whatsappMessageId = apiResult?.messages?.[0]?.id || null;

    // Save or update lead in DB
    let lead = await WhatsAppLead.findOne({ phoneNumber: normalizedPhone });
    if (!lead) {
      lead = new WhatsAppLead({
        name: name || "Prospect",
        phoneNumber: normalizedPhone,
        company: company || "",
        industry: industry || "General",
        serviceInterested: serviceInterested || "Web Development",
        customNotes: customNotes || ""
      });
    }

    lead.status = "approached";
    lead.lastPitch = pitchText;
    lead.lastContactedAt = new Date();
    lead.conversationHistory.push({
      sender: "ai",
      text: pitchText,
      whatsappMessageId,
      timestamp: new Date()
    });

    await lead.save();

    // Log outbound message
    await WhatsAppLog.create({
      phoneNumber: normalizedPhone,
      direction: "outbound",
      messageType: "pitch",
      messageContent: pitchText,
      status: "sent",
      whatsappMessageId
    });

    res.json({
      success: true,
      message: "Pitch sent successfully via WhatsApp!",
      whatsappMessageId,
      lead
    });
  } catch (error) {
    console.error("Error sending pitch:", error);

    // Log error in WhatsAppLog if phone number available
    if (req.body.phoneNumber) {
      await WhatsAppLog.create({
        phoneNumber: normalizePhoneNumber(req.body.phoneNumber),
        direction: "outbound",
        messageType: "pitch",
        messageContent: req.body.pitchText || "Failed pitch",
        status: "failed",
        errorDetails: { message: error.message }
      }).catch(() => {});
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to send WhatsApp pitch."
    });
  }
};

/**
 * Bulk launch automated WhatsApp outreach campaign
 */
export const bulkOutreach = async (req, res) => {
  try {
    const { leads } = req.body;

    if (!Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({
        success: false,
        message: "An array of leads is required."
      });
    }

    const results = [];
    let sentCount = 0;
    let failedCount = 0;

    for (const leadData of leads) {
      const { phoneNumber, name, company, industry, serviceInterested, customNotes, pitchText } = leadData;

      if (!phoneNumber) continue;

      const normalizedPhone = normalizePhoneNumber(phoneNumber);

      try {
        // Generate customized pitch if not provided
        const finalPitch = pitchText || await generateClientPitch({
          name,
          company,
          industry,
          serviceInterested,
          customNotes
        });

        // Send message
        const apiResult = await sendTextMessage(normalizedPhone, finalPitch);
        const whatsappMessageId = apiResult?.messages?.[0]?.id || null;

        // Upsert lead in DB
        let lead = await WhatsAppLead.findOne({ phoneNumber: normalizedPhone });
        if (!lead) {
          lead = new WhatsAppLead({
            name: name || "Prospect",
            phoneNumber: normalizedPhone,
            company: company || "",
            industry: industry || "General",
            serviceInterested: serviceInterested || "Web Development",
            customNotes: customNotes || ""
          });
        }

        lead.status = "approached";
        lead.lastPitch = finalPitch;
        lead.lastContactedAt = new Date();
        lead.conversationHistory.push({
          sender: "ai",
          text: finalPitch,
          whatsappMessageId,
          timestamp: new Date()
        });

        await lead.save();

        await WhatsAppLog.create({
          phoneNumber: normalizedPhone,
          direction: "outbound",
          messageType: "pitch",
          messageContent: finalPitch,
          status: "sent",
          whatsappMessageId
        });

        results.push({ phoneNumber: normalizedPhone, status: "success", whatsappMessageId });
        sentCount++;
      } catch (err) {
        console.error(`Failed to send bulk pitch to ${normalizedPhone}:`, err.message);
        results.push({ phoneNumber: normalizedPhone, status: "failed", error: err.message });
        failedCount++;
      }

      // Small throttle delay between outbound messages
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    res.json({
      success: true,
      summary: {
        total: leads.length,
        sent: sentCount,
        failed: failedCount
      },
      results
    });
  } catch (error) {
    console.error("Error in bulkOutreach:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to execute bulk outreach."
    });
  }
};

/**
 * Lead Management Controllers
 */
export const getLeads = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } }
      ];
    }

    const leads = await WhatsAppLead.find(filter).sort({ updatedAt: -1 });
    res.json({ success: true, count: leads.length, leads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createLead = async (req, res) => {
  try {
    const { name, phoneNumber, company, industry, serviceInterested, customNotes } = req.body;
    const normalizedPhone = normalizePhoneNumber(phoneNumber);

    const existing = await WhatsAppLead.findOne({ phoneNumber: normalizedPhone });
    if (existing) {
      return res.status(400).json({ success: false, message: "Lead with this phone number already exists." });
    }

    const lead = await WhatsAppLead.create({
      name,
      phoneNumber: normalizedPhone,
      company,
      industry,
      serviceInterested,
      customNotes
    });

    res.status(201).json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    await WhatsAppLead.findByIdAndDelete(id);
    res.json({ success: true, message: "Lead deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get all Client Inquiries & AI conversation threads
 */
export const getInquiries = async (req, res) => {
  try {
    const leads = await WhatsAppLead.find({
      "conversationHistory.0": { $exists: true }
    }).sort({ updatedAt: -1 });

    const inquiries = leads.map(lead => ({
      leadId: lead._id,
      name: lead.name,
      phoneNumber: lead.phoneNumber,
      company: lead.company,
      industry: lead.industry,
      status: lead.status,
      lastContactedAt: lead.lastContactedAt,
      conversationCount: lead.conversationHistory.length,
      conversationHistory: lead.conversationHistory
    }));

    res.json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get WhatsApp Activity Logs (Inbound & Outbound)
 */
export const getLogs = async (req, res) => {
  try {
    const logs = await WhatsAppLog.find().sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, count: logs.length, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * Meta WhatsApp Webhook GET Verification
 */
export const verifyWebhook = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "idrtech_whatsapp_verify_token_2026";

  if (mode && token) {
    if (mode === "subscribe" && token === verifyToken) {
      console.log("WhatsApp Webhook Verified Successfully!");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  res.sendStatus(400);
};

/**
 * Meta WhatsApp Webhook POST Listener & Gemini Auto-Responder
 */
export const handleWebhook = async (req, res) => {
  // Always respond 200 OK immediately to Meta to acknowledge receipt
  res.status(200).send("EVENT_RECEIVED");

  try {
    const body = req.body;

    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          const value = change.value;
          const messages = value?.messages;

          if (messages && messages.length > 0) {
            const msg = messages[0];
            const fromPhone = normalizePhoneNumber(msg.from);
            const msgId = msg.id;

            // Mark message as read
            await markMessageAsRead(msgId);

            // Handle incoming text message
            if (msg.type === "text" && msg.text?.body) {
              const incomingText = msg.text.body;
              console.log(`[WhatsApp Webhook] Incoming from ${fromPhone}: "${incomingText}"`);

              // Log incoming message
              await WhatsAppLog.create({
                phoneNumber: fromPhone,
                direction: "inbound",
                messageType: "text",
                messageContent: incomingText,
                status: "received",
                whatsappMessageId: msgId
              });

              // Find or create Lead
              let lead = await WhatsAppLead.findOne({ phoneNumber: fromPhone });
              if (!lead) {
                const contactName = value?.contacts?.[0]?.profile?.name || "Client";
                lead = new WhatsAppLead({
                  name: contactName,
                  phoneNumber: fromPhone,
                  status: "replied"
                });
              } else {
                lead.status = "replied";
              }

              // Append incoming message to conversation history
              lead.conversationHistory.push({
                sender: "client",
                text: incomingText,
                whatsappMessageId: msgId,
                timestamp: new Date()
              });

              // Generate AI response via Gemini
              console.log(`[Gemini AI] Generating auto-reply for ${lead.name}...`);
              const aiReplyText = await generateAIResponse({
                clientName: lead.name,
                conversationHistory: lead.conversationHistory,
                incomingMessage: incomingText
              });

              // Send AI auto-reply via WhatsApp
              const apiResult = await sendTextMessage(fromPhone, aiReplyText);
              const outboundMsgId = apiResult?.messages?.[0]?.id || null;

              // Append AI response to lead history
              lead.conversationHistory.push({
                sender: "ai",
                text: aiReplyText,
                whatsappMessageId: outboundMsgId,
                timestamp: new Date()
              });

              await lead.save();

              // Log outbound AI response
              await WhatsAppLog.create({
                phoneNumber: fromPhone,
                direction: "outbound",
                messageType: "ai_reply",
                messageContent: aiReplyText,
                status: "sent",
                whatsappMessageId: outboundMsgId
              });

              console.log(`[WhatsApp Webhook] Sent AI auto-reply to ${fromPhone}`);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error processing WhatsApp webhook event:", error);
  }
};
