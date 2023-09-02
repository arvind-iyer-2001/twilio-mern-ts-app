"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var twilioConfig = function () {
    (0, dotenv_1.config)();
    if (!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_API_KEY && process.env.TWILIO_API_SECRET)) {
        throw new Error('Config details not provided. Provide Twilio Configuations ');
    }
    return {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        apiKey: process.env.TWILIO_API_KEY,
        apiSecret: process.env.TWILIO_API_SECRET
    };
};
exports.default = twilioConfig;
