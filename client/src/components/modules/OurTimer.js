import React, { useState, useEffect } from "react";

import "../../utilities.css";

import { get, post } from "../../utilities";
import {socket} from "../../client-socket.js";
import { navigate } from "@reach/router";

const OurTimer = (props) => {
    const [stringSeconds, setStringSeconds] = useState(undefined);
    const [stringMinutes, setStringMinutes] = useState("00");
    const [seconds, setSeconds] = useState(props.seconds);
    const [currentSeconds, setCurrentSeconds] = useState(1000);
    const padNum = (num) => {
        let zero = '00';
        return (zero + num).slice(-2);
    };
    useEffect(() => {
        
        const interval = setTimeout(() => {
            // console.log"current time on the timer is ", currentSeconds);
            if(props.startTime === 0){ // Something's broken.
                setCurrentSeconds( seconds);
            }else{
                setCurrentSeconds( seconds - (Date.now()-props.startTime)/1000 );
            }
            // console.log"current time left !",currentSeconds);
            if (-0.5 <= currentSeconds && currentSeconds <= 0) {
                props.handleTimeout();
                // console.log"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
            } else {
                setStringMinutes( padNum( Math.floor(currentSeconds /60) ));
                setStringSeconds( padNum( Math.floor(currentSeconds % 60)));
            }
        },50);
        return () => {
            clearTimeout(interval);
        };
    },[currentSeconds]);
    return (
        stringSeconds ? 
        <div className={`bg-gray-50 bg-opacity-50 mx-1 p-2 text-7xl ${!(currentSeconds < 10 ) ? "text-emerald-600" : "text-red-500"} flex justify-center`}>
            <div className="font-mono leading-none">{stringMinutes}:{stringSeconds}</div>
        </div>
        : <div></div>
    );
};
export default OurTimer;