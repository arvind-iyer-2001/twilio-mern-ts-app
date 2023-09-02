
// ./service/tokens.ts
import twilio from 'twilio';
import twilioConfig from './config';

const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

export function generateTwilioToken(identity: string, roomName: string): string {
  const accessToken = new AccessToken(
    twilioConfig().accountSid,
    twilioConfig().apiKey,
    twilioConfig().apiSecret, {
      identity: identity,
    }
  );

  const videoGrant = new VideoGrant({room: roomName});
  accessToken.addGrant(videoGrant);

  return accessToken.toJwt();
}
