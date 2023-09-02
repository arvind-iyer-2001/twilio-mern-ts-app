import { useEffect, useState } from "react";
import Video, { RemoteParticipant } from "twilio-video";
import useTwilioVideoContext from "./useTwilioVideoContext";
import axiosInstance from "@Utils/axiosInstance";
import useAudioProcessing from "./useAudioProcessing";

const useConnectTwilioVideo = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { startAudioProcessing } = useAudioProcessing()
    const { state, dispatch } = useTwilioVideoContext();

    const connectToVideoRoom = async (username: string, roomName: string) => {
        try{
            dispatch({ type: "CONNECTING" });
            console.log("Sending Request to Server to obtain Token");
            const data = await axiosInstance.post(
                `/video/token?roomName=${roomName}`, 
                { identity: username },
                {   
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => {
                console.log('Raw response:', res);
                return res.data;
            }) as { roomName: string ; token: string };
            console.log(data);
            const room = await Video.connect(data.token, {name: data.roomName});
            console.log(room);
            dispatch({ type: "JOINED_ROOM", payload: { room: room } });
            return room;
        } catch (err: any) {
            console.error(err);
            setErrorMessage(err.message);
            dispatch({ type: "CONNECTION_FAILED" })
        }
    }
    
    const disconnectFromVideoRoom = async () => {
        if(state.room !== null){
            state.room.localParticipant.tracks.forEach((trackPub) => {
                trackPub.unpublish();
            });
            state.room.disconnect();
            dispatch({type: "LEAVE_ROOM"});
        }
    }

    const participantConnected = (participant: RemoteParticipant) => {
        dispatch({
          type: "REMOTE_PARTICIPANT_JOINED",
          payload: { remoteParticipant: participant },
        });
      };
  
    const participantDisconnected = (participant: RemoteParticipant) => {
        dispatch({
          type: "REMOTE_PARTICIPANT_LEFT",
          payload: { remoteParticipant: participant },
        });
    };

    const initializeRoom = async () => {
        if(state.room){
            console.log('Initializing Room');
            state.room.on("participantConnected", participantConnected);
            state.room.on("participantDisconnected", participantDisconnected);
            state.room.participants.forEach(participantConnected);
            startAudioProcessing();
        }
    }

    useEffect(() => {
        initializeRoom();
    }, [state.room])
    return { connectToVideoRoom, disconnectFromVideoRoom, initializeRoom, errorMessage }
}

export default useConnectTwilioVideo;