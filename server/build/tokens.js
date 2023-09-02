"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTwilioToken = void 0;
// ./service/tokens.ts
var twilio_1 = __importDefault(require("twilio"));
var config_1 = __importDefault(require("./config"));
var AccessToken = twilio_1.default.jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
function generateTwilioToken(identity, roomName) {
    var accessToken = new AccessToken((0, config_1.default)().accountSid, (0, config_1.default)().apiKey, (0, config_1.default)().apiSecret, {
        identity: identity,
    });
    var videoGrant = new VideoGrant({ room: roomName });
    accessToken.addGrant(videoGrant);
    return accessToken.toJwt();
}
exports.generateTwilioToken = generateTwilioToken;
