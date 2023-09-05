import { useCallback } from "react";
// import ParticipantComponent from "./ParticipantComponent";
import useTwilioVideoContext from "@Hooks/useTwilioVideoContext";
import useConnectTwilioVideo from "@Hooks/useTwilioVideoServices";
import ParticipantComponent from "@Components/ParticipantComponent";
import useLocalAudioToggle from "@Hooks/useLocalAudioToggle";

const VideoChatRoom = () => {
  const { state } = useTwilioVideoContext();
  const { disconnectFromVideoRoom } = useConnectTwilioVideo();
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  const handleLogout = useCallback(async () => {
    await disconnectFromVideoRoom();
  }, []);

  return (
    <div className="room">
      <h2>Room: {state.room!.name}</h2>
      <span>
        <button onClick={handleLogout}>Log out</button>
        
        <button onClick={toggleAudioEnabled}>
            {isAudioEnabled ? "Mute" : "Unmute"}
        </button>
      </span>
      
      <div className="remote-participants">
        {state.room ? (
          <ParticipantComponent
            key={state.room.localParticipant.sid}
            participant={state.room.localParticipant}
          />
        ) : (
          "Bleh"
        )}
        {state.remoteParticipants.map((participant) => (
          <ParticipantComponent
            key={participant.sid}
            participant={participant}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoChatRoom;
