import dotenv from "dotenv";
dotenv.config();

import { generateClientPitch, generateAIResponse } from "./services/gemini.service.js";
import { sendTextMessage, normalizePhoneNumber } from "./services/whatsapp.service.js";

async function runTests() {
  console.log("=========================================");
  console.log("  IDR TECH WhatsApp & Gemini AI Test Runner ");
  console.log("=========================================\n");

  console.log("1. Checking Environment Variables...");
  console.log(`- WHATSAPP_ACCESS_TOKEN: ${process.env.WHATSAPP_ACCESS_TOKEN ? "✓ PRESENT (" + process.env.WHATSAPP_ACCESS_TOKEN.substring(0, 10) + "...)" : "✗ MISSING"}`);
  console.log(`- WHATSAPP_PHONE_NUMBER_ID: ${process.env.WHATSAPP_PHONE_NUMBER_ID ? "✓ " + process.env.WHATSAPP_PHONE_NUMBER_ID : "✗ MISSING"}`);
  console.log(`- WHATSAPP_BUSINESS_ACCOUNT_ID: ${process.env.WHATSAPP_BUSINESS_ACCOUNT_ID ? "✓ " + process.env.WHATSAPP_BUSINESS_ACCOUNT_ID : "✗ MISSING"}`);
  console.log(`- GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? "✓ PRESENT (" + process.env.GEMINI_API_KEY.substring(0, 8) + "...)" : "✗ MISSING"}\n`);

  console.log("2. Testing Gemini Pitch Generation...");
  try {
    const pitch = await generateClientPitch({
      name: "Rahul Sharma",
      company: "Apex Retail Solutions",
      industry: "E-Commerce",
      serviceInterested: "Custom Web App & Mobile App Development",
      customNotes: "Currently relying on legacy store. Wants 3x sales conversion and fast mobile experience."
    });
    console.log("✓ Gemini Pitch Generated Successfully:\n");
    console.log("-----------------------------------------");
    console.log(pitch);
    console.log("-----------------------------------------\n");
  } catch (err) {
    console.error("✗ Gemini Pitch Generation Failed:", err.message);
  }

  console.log("3. Testing Gemini AI Response Generator...");
  try {
    const aiResponse = await generateAIResponse({
      clientName: "Rahul Sharma",
      conversationHistory: [
        { sender: "ai", text: "Hi Rahul! We help E-Commerce brands scale with custom web & mobile apps." }
      ],
      incomingMessage: "Hi, what are your rates for a custom e-commerce mobile app for iOS and Android?"
    });
    console.log("✓ Gemini AI Response Generated Successfully:\n");
    console.log("-----------------------------------------");
    console.log(aiResponse);
    console.log("-----------------------------------------\n");
  } catch (err) {
    console.error("✗ Gemini AI Response Failed:", err.message);
  }

  // Check if target test phone number was provided as argument (e.g. node test_whatsapp.js 919876543210)
  const targetPhone = process.argv[2];
  if (targetPhone) {
    console.log(`4. Testing WhatsApp Message Dispatch to ${targetPhone}...`);
    try {
      const res = await sendTextMessage(targetPhone, "Hello from IDR Tech WhatsApp Automation System! 🚀\nYour Gemini AI & WhatsApp outreach setup is fully functional.");
      console.log("✓ WhatsApp Message Dispatched Successfully!", res);
    } catch (err) {
      console.error("✗ WhatsApp Message Dispatch Failed:", err.message);
    }
  } else {
    console.log("4. Skipping WhatsApp Message Dispatch test.");
    console.log("   (To test sending a real WhatsApp message, run: node test_whatsapp.js <your_phone_number_with_country_code>)\n");
  }

  console.log("=========================================");
  console.log("  Test Suite Completed ");
  console.log("=========================================");
}

runTests();
