import React, { useState, useEffect } from "react";

import "../../utilities.css";

import { get, post } from "../../utilities";
import {socket} from "../../client-socket.js";
import { navigate } from "@reach/router";

const TypeWriter = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        
        const timeout = setTimeout(() => {
            console.log("timeout");
            if (currentIndex >= props.text.length) {
                return;
            }
            if (props.stochastic !== "true") {
                setCurrentIndex(currentIndex + 1);
                return;
            }
            let num = Math.random();
            if (num > 0.9) {
                setTimeout(() => {
                    setCurrentIndex(currentIndex + 1);
                }, 100+Math.random()*300);
            } else if (currentIndex>0 && num > 0.8){
                setCurrentIndex(currentIndex-1);
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        },30);
        return () => {
            clearTimeout(timeout);
        };
    }, [currentIndex]);
    return (
        <div>{props.text.slice(0, currentIndex)}</div>
    );
};
export default TypeWriter;