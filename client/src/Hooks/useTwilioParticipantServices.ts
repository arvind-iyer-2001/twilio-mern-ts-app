import { useEffect, useState, useRef } from 'react';
import { AudioTrack, AudioTrackPublication, Participant, Track, VideoTrack, VideoTrackPublication } from 'twilio-video';

const useTwilioParticipantServices = (participant: Participant) => {

    const [videoTracks, setVideoTracks] = useState<VideoTrack[]>([]);
    const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([]);

    const videoRef = useRef<HTMLVideoElement>();
    const audioRef = useRef<HTMLAudioElement>();

    const tracksFromPublications = (trackMap: Map<string, VideoTrackPublication | AudioTrackPublication>) => {
        return Array.from(trackMap.values())
            .map((publication) => publication.track)
            .filter((track) => track !== null) as Track[];
    }

    const trackSubscribed = (track: Track) => {
        if (track.kind === "video") {
            setVideoTracks((videoTracks) => [...videoTracks, track as VideoTrack]);
        } else if (track.kind === "audio") {
            setAudioTracks((audioTracks) => [...audioTracks, track as AudioTrack]);
        }
    };

    const trackUnsubscribed = (track: Track) => {
        if (track.kind === "video") {
            setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
        } else if (track.kind === "audio") {
            setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
        }
    };

    const initParticipantMedia = () => {
        setVideoTracks(tracksFromPublications(participant.videoTracks) as VideoTrack[]);
        setAudioTracks(tracksFromPublications(participant.audioTracks) as AudioTrack[]);
        participant.on("trackSubscribed", trackSubscribed);
        participant.on("trackUnsubscribed", trackUnsubscribed);
    }

    const stopParticipantMedia = () => {
        setVideoTracks([]);
        setAudioTracks([]);
        participant.removeAllListeners();
    }

    // For Participant Media
    useEffect(() => {
        initParticipantMedia();
        return () => {
            stopParticipantMedia();
        };
    }, [participant]);

    // Attach Video Tracks to VideoRef
    useEffect(() => {
        const videoTrack = videoTracks[0];
        if (videoTrack) {
            videoTrack.attach(videoRef.current);
            return () => {
                videoTrack.detach();
            };
        }
    }, [videoTracks]);

    // Attach Audio Tracks to AudioRef
    useEffect(() => {
        const audioTrack = audioTracks[0];
        if (audioTrack) {
            audioTrack.attach(audioRef.current);
            return () => {
                audioTrack.detach();
            };
        }
    }, [audioTracks]);

    return { videoRef, audioRef }
}

export default useTwilioParticipantServices