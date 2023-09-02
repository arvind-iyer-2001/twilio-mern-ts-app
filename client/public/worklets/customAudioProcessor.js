/* eslint-disable no-useless-constructor */
class CustomAudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
    }

    process(inputList, outputList, parameters) {
        // Processing logic here
        console.log(inputList);
        
        return true;
    }
}

registerProcessor("custom-audio-processor", CustomAudioProcessor);
