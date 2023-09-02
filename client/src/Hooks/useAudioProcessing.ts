import useTwilioVideoContext from "./useTwilioVideoContext"

const useAudioProcessing = () => {
    const { state } = useTwilioVideoContext();

    const audioContext = new AudioContext();

    async function startAudioProcessing() {
        if (!state.room) throw new Error("Nah Fam, NGW");

        // Use flatMap to eliminate the need for Array.from().map() chaining
        const localAudioTracks = Array.from(state.room.localParticipant.audioTracks.values()).flatMap(trackPub => trackPub.track ? [trackPub.track] : []);
        const firstRemoteParticipant = Array.from(state.room.participants.values())[0];
        const remoteAudioTracks = firstRemoteParticipant ? Array.from(firstRemoteParticipant.audioTracks.values()).flatMap(trackPub => trackPub.track ? [trackPub.track] : []) : [];

        await audioContext.audioWorklet.addModule('worklets/customAudioProcessor.js');

        const mediaStream = new MediaStream();

        // Use a single forEach loop to add all tracks
        localAudioTracks.forEach((track) => {
            mediaStream.addTrack(track.mediaStreamTrack);
        });
        remoteAudioTracks.forEach((track) => {
            mediaStream.addTrack(track.mediaStreamTrack);
        });

        const audioSource = audioContext.createMediaStreamSource(mediaStream);
        const customAudioProcessor = new AudioWorkletNode(audioContext, 'custom-audio-processor');

        audioSource.connect(customAudioProcessor);
        customAudioProcessor.connect(audioContext.destination);

        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }
    }


    return { startAudioProcessing }
}
export default useAudioProcessing;