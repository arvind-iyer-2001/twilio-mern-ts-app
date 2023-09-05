import { ReactNode, createContext, useReducer } from "react";
import { TwilioVideoContextAction, TwilioVideoContextState } from "@Types/TwilioVideoContextTypes";

const initialState : TwilioVideoContextState = {
    room: null,
    connecting: false,
    remoteParticipants: [],
};

export const TwilioVideoContext = createContext<{
    state: TwilioVideoContextState;
    dispatch: React.Dispatch<TwilioVideoContextAction>
}>({
    state: initialState,
    dispatch: () => null,
});

const twilioVideoReducer = (
    state: TwilioVideoContextState,
    action: TwilioVideoContextAction
) => {
    switch (action.type) {
        case "CONNECTING":
            console.log("Connecting");
            return {
                ...state,
                connecting: true
            }
        case "CONNECTION_FAILED":
            return {
                ...state,
                connecting: false
            }
        case "JOINED_ROOM":
            console.log("Room joined");
            return {
                ...state,
                room: action.payload.room,
                connecting: false,
                remoteParticipants: [],
            };
        case "REMOTE_PARTICIPANT_JOINED":
            return {
                ...state,
                remoteParticipants: [
                    ...state.remoteParticipants
                    .filter((participant) => participant.sid !== action.payload.remoteParticipant.sid || participant.identity !== action.payload.remoteParticipant.identity),
                    action.payload.remoteParticipant,
                ],
            };
        case "REMOTE_PARTICIPANT_LEFT":
            return {
                ...state,
                remoteParticipants: [
                    ...state.remoteParticipants
                    .filter((participant) => participant.sid !== action.payload.remoteParticipant.sid || participant.identity !== action.payload.remoteParticipant.identity ),
                ],
            };
        case "LEAVE_ROOM":
            return {
                ...state,
                room: null,
                connecting: false,
                remoteParticipants: []
            };
        default:
            return state;
    }
};

const TwilioVideoProvider : React.FC<{children: ReactNode}> = ({ children }) => {
    const [state, dispatch] = useReducer(twilioVideoReducer, initialState);
    return (
        <TwilioVideoContext.Provider value={{ state, dispatch }}>
            {children}
        </TwilioVideoContext.Provider>
    );
};

export default TwilioVideoProvider;
