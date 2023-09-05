// matrix-subtraction-processor.js
class MatrixSubtractionProcessor extends AudioWorkletProcessor {
    process(inputs, outputs, parameters) {
      const localInput = inputs[0];
      const remoteInput = inputs[1];
      const output = outputs[0];
  
      for (let channel = 0; channel < output.length; ++channel) {
        const localChannel = localInput[channel];
        const remoteChannel = remoteInput ? remoteInput[channel] : [ 0 ] * output.length;
        const outputChannel = output[channel];
  
        if (!localChannel || !remoteChannel) continue;
  
        for (let i = 0; i < outputChannel.length; ++i) {
          outputChannel[i] = remoteChannel[i] - localChannel[i];
        }
      }
      
      console.log(output);
      return true;
    }
  }
  
  registerProcessor('matrix-subtraction-processor', MatrixSubtractionProcessor);
  