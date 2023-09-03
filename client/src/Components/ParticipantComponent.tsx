import useTwilioParticipantServices from "@Hooks/useTwilioParticipantServices";
import { Participant } from "twilio-video";

const ParticipantComponent = ({participant} : {participant: Participant}) => {
    const { videoRef, audioRef } = useTwilioParticipantServices(participant);

    return (
        <div className="participant">
            <h3>{participant.identity}</h3>
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} muted={true} />
        </div>
    );
};

export default ParticipantComponent;
