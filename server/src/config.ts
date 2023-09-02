import { TwilioConfig } from "./types/TwilioConfig.types";
import { config } from "dotenv";
const twilioConfig = (): TwilioConfig => {
  config();
  if (!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_API_KEY && process.env.TWILIO_API_SECRET))
  {
    throw new Error('Config details not provided. Provide Twilio Configuations ');
  }
  return {
    accountSid: process.env.TWILIO_ACCOUNT_SID as string,
    apiKey: process.env.TWILIO_API_KEY as string,
    apiSecret: process.env.TWILIO_API_SECRET as string
  }
};

export default twilioConfig;
