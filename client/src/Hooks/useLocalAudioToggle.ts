import { useCallback } from "react";
import useIsTrackEnabled from "./useIsTrackEnabled";
import useTwilioVideoContext from "./useTwilioVideoContext";

export default function useLocalAudioToggle() {
    const { state } = useTwilioVideoContext();
    const audioTracks = Array.from(state.room!.localParticipant.audioTracks.values()).flatMap(trackPub => trackPub.track ? [trackPub.track] : []);
    const isEnabled = useIsTrackEnabled(audioTracks[0]);
  
    const toggleAudioEnabled = useCallback(() => {
        audioTracks.forEach(audioTrack => {
            if (audioTrack) {
                audioTrack.isEnabled ? audioTrack.disable() : audioTrack.enable();
            }
        });
      
    }, [audioTracks]);
  
    return [isEnabled, toggleAudioEnabled] as const;
  }