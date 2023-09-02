import { useContext } from 'react';
import { TwilioVideoContext } from "@Contexts/TwilioVideoContext";

const useTwilioVideoContext = () => {
    const context = useContext(TwilioVideoContext);
    if(!context){
        console.log("No TwilioVideoContext");
        throw new Error("No TwilioVideoContext");
    }
    return context;
};
export default useTwilioVideoContext;