import { LocalAudioTrack, RemoteAudioTrack } from "twilio-video";
import useTwilioVideoContext from "./useTwilioVideoContext"

const useAudioProcessing = () => {
    const { state } = useTwilioVideoContext();
    const audioContext = new AudioContext({
        sampleRate: 8820
    });

    const createAudioWorkletProcessor = async (processorFileName: string, options?: AudioWorkletNodeOptions | undefined) => {
        await audioContext.audioWorklet.addModule(`worklets/${processorFileName}.js`);
        const customAudioProcessor = new AudioWorkletNode(audioContext, processorFileName, options);
        return customAudioProcessor;
    }

    const createAudioSource = (...audioTracks: (LocalAudioTrack | RemoteAudioTrack)[]) => {
        const mediaStream = new MediaStream();
        audioTracks.forEach(audioTrack => {
            mediaStream.addTrack(audioTrack.mediaStreamTrack);
        });
        const audioSource = audioContext.createMediaStreamSource(mediaStream);
        return audioSource;
    }

    const singleInputAudioProcessing = async (audioTrack: LocalAudioTrack | RemoteAudioTrack) => {
        // Create AudioWorkletProcessor
        const customAudioProcessor = await createAudioWorkletProcessor('custom-audio-processor');

        // Create Audio Source
        const audioSource = createAudioSource(audioTrack)

        // Connect Nodes
        audioSource.connect(customAudioProcessor);
        customAudioProcessor.connect(audioContext.destination);

        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }
    }

    const dualInputAudioProcessing_version1 = async (localAudioTrack: LocalAudioTrack, remoteAudioTrack: RemoteAudioTrack) => {
        // Create AudioWorkletProcessor
        const customAudioProcessor = await createAudioWorkletProcessor('custom-audio-processor');

        // Create Audio Source
        const audioSource = createAudioSource(localAudioTrack, remoteAudioTrack);

        // Connect Nodes
        audioSource.connect(customAudioProcessor);
        customAudioProcessor.connect(audioContext.destination);

        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }
    }

    async function dualInputAudioProcessing_version2(localAudioTrack: LocalAudioTrack, remoteAudioTrack: RemoteAudioTrack) {
        // Create AudioWorkletProcessor
        const customAudioProcessorInputNode = await createAudioWorkletProcessor('custom-audio-processor', {
            numberOfInputs: 2,
            numberOfOutputs: 2,
        });

        // Create Audio Sources
        const localSource = createAudioSource(localAudioTrack);
        const remoteSource = createAudioSource(remoteAudioTrack);
        
        // Connect nodes
        localSource.connect(customAudioProcessorInputNode, 0, 0); // Connect local source node output0 to customAudioProcessorInputNode input0
        remoteSource.connect(customAudioProcessorInputNode, 0, 1); // Connect remote source node output0 to customAudioProcessorInputNode input1
        customAudioProcessorInputNode.connect(audioContext.destination); // Connect to destination (speakers)
    }

    async function startAudioProcessing() {
        try {
            if (!state.room) throw new Error("Can not start audio processing without joining room");

            // Use flatMap to eliminate the need for Array.from().map() chaining
            const localAudioTracks = Array.from(state.room.localParticipant.audioTracks.values()).flatMap(trackPub => trackPub.track ? [trackPub.track] : []);
            const firstLocalAudioTrack = localAudioTracks[0] || null;

            const firstRemoteParticipant = Array.from(state.room.participants.values())[0];
            const remoteAudioTracks = firstRemoteParticipant ? Array.from(firstRemoteParticipant.audioTracks.values()).flatMap(trackPub => trackPub.track ? [trackPub.track] : []) : [];
            const firstRemoteAudioTrack = remoteAudioTracks[0] || null;
            if (firstLocalAudioTrack) {
                // Test 0
                // singleInputAudioProcessing(firstLocalAudioTrack);
                if (firstRemoteAudioTrack) {
                    // Test 1
                    // singleInputAudioProcessing(firstRemoteAudioTrack);
                    // Test 2
                    // dualInputAudioProcessing_version1(firstLocalAudioTrack, firstRemoteAudioTrack); 
                    // Test 3
                    dualInputAudioProcessing_version2(firstLocalAudioTrack, firstRemoteAudioTrack);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    return { startAudioProcessing }
}
export default useAudioProcessing;

// Src1 -|      |       |
//       |----->|       |
// Src2 -|      |       |