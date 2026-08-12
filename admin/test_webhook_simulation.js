import dotenv from "dotenv";
dotenv.config();

import { generateAIResponse } from "./services/gemini.service.js";

async function simulateClientInquiry() {
  console.log("=================================================");
  console.log("  SIMULATING REAL INCOMING WHATSAPP CLIENT INQUIRY");
  console.log("=================================================\n");

  const simulatedIncomingMessage = "Hi IDR Tech! I saw your portfolio. We run a logistics business and need a custom web portal and mobile app for tracking orders. Can you give me an estimate?";

  console.log(`📩 Simulated Incoming WhatsApp Message from Client (+919876543210):`);
  console.log(`"${simulatedIncomingMessage}"\n`);

  console.log("🤖 Gemini AI Processing & Response Generation...");

  const conversationHistory = [
    { sender: "client", text: simulatedIncomingMessage, timestamp: new Date() }
  ];

  try {
    const aiResponse = await generateAIResponse({
      clientName: "Logistics Client",
      conversationHistory: conversationHistory,
      incomingMessage: simulatedIncomingMessage
    });

    console.log("\n=================================================");
    console.log("🤖 AI AUTO-REPLY (SENT BACK TO CLIENT VIA WHATSAPP):");
    console.log("=================================================");
    console.log(aiResponse);
    console.log("=================================================\n");

    console.log("✓ Inquiry captured, conversation history updated, and AI response generated successfully!");
  } catch (err) {
    console.error("✗ Simulation Error:", err.message);
  }
}

simulateClientInquiry();
