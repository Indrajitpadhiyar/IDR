import dotenv from "dotenv";
dotenv.config();

/**
 * Calls Google Gemini REST API using generateContent endpoint
 */
const callGeminiAPI = async (prompt, systemInstruction = "") => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing in environment variables.");
  }

  // Model fallback list: gemini-2.5-flash -> gemini-1.5-flash -> gemini-pro
  const models = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-pro"];
  let lastError = null;

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    };

    if (systemInstruction) {
      requestBody.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok && data.candidates && data.candidates.length > 0) {
        const textResponse = data.candidates[0]?.content?.parts[0]?.text;
        if (textResponse) {
          return textResponse.trim();
        }
      }

      if (data.error) {
        console.warn(`Gemini model ${model} error:`, data.error.message);
        lastError = new Error(`Gemini API (${model}): ${data.error.message}`);
      }
    } catch (err) {
      console.warn(`Fetch error for Gemini model ${model}:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to generate content with Gemini API.");
};

/**
 * Generates personalized WhatsApp outreach pitch for target clients
 */
export const generateClientPitch = async ({ name, company, industry, serviceInterested, customNotes }) => {
  const systemInstruction = `
You are an expert B2B Client Acquisition Specialist for IDR Tech (an elite Software & Digital Transformation Agency).
Your goal is to craft highly personalized, engaging, concise, and conversion-focused WhatsApp outreach messages.

Formatting rules for WhatsApp:
- Use bolding (*word*) for key emphasis.
- Keep paragraphs short (1-3 sentences max).
- Use professional yet approachable tone with relevant emojis.
- Include a clear, zero-pressure Call-To-Action (CTA) like requesting a 5-minute call or sending a sample demo/portfolio.
- DO NOT use generic placeholders like [Your Name]. Sign off as "IDR Tech Team".
`;

  const prompt = `
Generate a tailored WhatsApp outreach pitch for the following prospect:
- Client Name: ${name || "Valued Business Owner"}
- Company Name: ${company || "your company"}
- Industry / Niche: ${industry || "Business"}
- Service Interested In: ${serviceInterested || "Custom Web Development & Digital Solutions"}
- Specific Context / Notes: ${customNotes || "Looking to modernize digital presence and scale sales."}

Write a natural, high-converting WhatsApp message ready to send directly to the prospect.
`;

  return await callGeminiAPI(prompt, systemInstruction);
};

/**
 * Generates AI auto-reply to incoming client WhatsApp messages
 */
export const generateAIResponse = async ({ clientName, conversationHistory = [], incomingMessage }) => {
  const systemInstruction = `
You are AI Assistant for IDR Tech, a modern web & software development agency specializing in:
1. Custom Web Applications & Landing Pages (React, Next.js, High Speed, SEO Optimized)
2. Mobile App Development (iOS & Android)
3. UI/UX Design & Brand Revamp
4. Custom ERP / Admin Dashboards & Cloud Solutions
5. WhatsApp & Automation Solutions

Your role on WhatsApp:
- Be polite, professional, extremely helpful, and concise (WhatsApp chat format).
- Answer client questions accurately.
- Ask qualifying questions to understand their project requirements (budget, timeline, scope).
- Encourage scheduling a discovery call or meeting with the IDR Tech team.
- Format responses cleanly with line breaks and appropriate WhatsApp formatting (*bolding*).
`;

  // Format past history for context
  let historyText = conversationHistory
    .slice(-6) // Keep last 6 exchanges for context efficiency
    .map(msg => `${msg.sender.toUpperCase()}: ${msg.text}`)
    .join("\n");

  const prompt = `
Client Name: ${clientName || "Client"}

Recent Conversation History:
${historyText || "No previous history."}

New Incoming Message from Client:
"${incomingMessage}"

Generate a helpful, friendly, and persuasive reply for WhatsApp.
`;

  return await callGeminiAPI(prompt, systemInstruction);
};
