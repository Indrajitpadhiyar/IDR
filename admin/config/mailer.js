import dotenv from "dotenv";
import { Resend } from "resend";

// ensure environment variables are loaded even if this module is imported early
dotenv.config();

if (!process.env.RESEND_API_KEY) {
  console.error("WARNING: RESEND_API_KEY is not defined in environment variables");
}

export const resendClient = new Resend(process.env.RESEND_API_KEY);

