import React, { useEffect } from "react";
import "../../../utilities.css";
import { useState } from "react";
import "../Prompt.css";


const VotingSelection = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [stringSeconds, setStringSeconds] = useState("00");
    const [stringMinutes, setStringMinutes] = useState("01");

    const padNum = (num) => {
        let zero = '00';
        return (zero + num).slice(-2);
    };
    
    useEffect(() => {
       
            const interval = setInterval(() => {
                console.log("BLAHGAH!");
                if (seconds === 0 && minutes === 0) {
                    props.handleVoteTimeout();
                } else {
                    if (minutes > 0 && seconds > 0) {
                        setSeconds(seconds-1);
    
                    } else if (minutes > 0 && seconds === 0) {
                        setMinutes(minutes-1);
                        setSeconds(59);
                    } else {
                        setSeconds(seconds-1);
                    }
                    setStringMinutes( padNum(minutes) );
                    setStringSeconds( padNum(seconds));
                }
            },1000);
        
        
        return () => {
            clearInterval(interval);
        };
    });
    return (
        <div>
            <div className="Prompt-prompt">
                <h1>{props.currentPrompt}</h1>
            </div>
            <div className="Prompt-prompt">
                <h1>{props.currentResponse0}</h1>
            </div>
            <div className="Prompt-prompt">
                <h1>{props.currentResponse1}</h1>
            </div>

            <button onClick = {props.handleVote0}>
                Vote 0      
            </button>
            <button onClick = {props.handleVote1}>
                Vote 1
            </button>
            <div>
                <div className="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
                <div className="font-mono leading-none">{stringMinutes}:{stringSeconds}</div>
                </div>
            </div>
        </div>
    );
};

export default VotingSelection;
