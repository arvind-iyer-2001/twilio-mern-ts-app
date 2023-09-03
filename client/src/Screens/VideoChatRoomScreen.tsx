import { useCallback } from "react";
// import ParticipantComponent from "./ParticipantComponent";
import useTwilioVideoContext from "@Hooks/useTwilioVideoContext";
import useConnectTwilioVideo from "@Hooks/useTwilioVideoServices";
import ParticipantComponent from "@Components/ParticipantComponent";

const VideoChatRoom = () => {
    const { state } = useTwilioVideoContext();
    const { disconnectFromVideoRoom } = useConnectTwilioVideo();

    const handleLogout = useCallback(async () => {
        await disconnectFromVideoRoom();
    }, []);

    return (
        <div className="room">
            <h2>Room: {state.room!.name}</h2>
            <button onClick={handleLogout}>Log out</button>
            <div className="local-participant">
                {state.room ? (
                    <ParticipantComponent
                        key={state.room.localParticipant.sid}
                        participant={state.room.localParticipant}
                    />
                ) : (
                    "Bleh"
                )}
            </div>
            <h3>Remote Participants</h3>
            <div className="remote-participants">{
                state.remoteParticipants.map((participant) => (
                    <ParticipantComponent key={participant.sid} participant={participant} />
                ))
            }</div>
        </div>
    );
};

export default VideoChatRoom;
