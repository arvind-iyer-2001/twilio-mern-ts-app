import { Room, RemoteParticipant } from "twilio-video";

export type TwilioVideoContextState = 
{
    room: Room | null,
    connecting: boolean,
    remoteParticipants: RemoteParticipant[]
}

export type TwilioVideoContextAction =
    | {
        type: "CONNECTING";
    }
    | {
        type: "CONNECTION_FAILED";
    }
    | {
        type: "JOINED_ROOM";
        payload: { room: Room };
    }
    | {
        type: "REMOTE_PARTICIPANT_JOINED";
        payload: { remoteParticipant: RemoteParticipant };
    }
    // | { type: 'REMOTE_PARTICIPANTS_JOINED'; payload: {remoteParticipants: RemoteParticipant[]} }
    | {
        type: "REMOTE_PARTICIPANT_LEFT";
        payload: { remoteParticipant: RemoteParticipant };
    }
    | { type: "LEAVE_ROOM" };