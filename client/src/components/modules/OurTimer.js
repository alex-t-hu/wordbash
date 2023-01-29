import React, { useState, useEffect } from "react";

import "../../utilities.css";

import { get, post } from "../../utilities";
import {socket} from "../../client-socket.js";
import { navigate } from "@reach/router";

const OurTimer = (props) => {
    const [stringSeconds, setStringSeconds] = useState(undefined);
    const [stringMinutes, setStringMinutes] = useState("00");
    const [seconds, setSeconds] = useState(props.seconds);
    const padNum = (num) => {
        let zero = '00';
        return (zero + num).slice(-2);
    };
    useEffect(() => {
        
        const interval = setInterval(() => {
            console.log("current time left !",seconds);
            if (seconds <= 0) {
                props.handleTimeout();
            } else {
                setSeconds(seconds-1);
                setStringMinutes( padNum( Math.floor(seconds /60) ));
                setStringSeconds( padNum( Math.floor(seconds % 60)));
            }
        },1000);
        return () => {
            clearInterval(interval);
        };
    });
    return (
        stringSeconds ? 
        <div className="mx-1 p-2 text-9xl text-green-400 flex justify-center">
            <div className="font-mono leading-none">{stringMinutes}:{stringSeconds}</div>
        </div>
        : <div></div>
    );
};
export default OurTimer;