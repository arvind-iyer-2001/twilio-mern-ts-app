/* eslint-disable no-useless-constructor */
class CustomAudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
    }

    process(inputList, outputList, parameters) {
        // Processing logic here
        const localInput = inputList[0][0];
        const remoteInput = inputList[1][0];
        var currentdate = new Date();

        console.log("Local Input @ ", currentdate.toISOString(), localInput);
        console.log("Remote Input @ ", currentdate.toISOString(), remoteInput);
        console.log("Output @ ", currentdate.toISOString(), outputList);
        
        return true;
    }
}

registerProcessor("custom-audio-processor", CustomAudioProcessor);
