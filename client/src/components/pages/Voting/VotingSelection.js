import React, { useEffect } from "react";
import "../../../utilities.css";
import { useState } from "react";
import "../Prompt.css";
import OurTimer from "../../modules/OurTimer.js";

const VotingSelection = (props) => {

    
    return (
        <div className="relative flex flex-col h-screen justify-between bg-slate-100 py-5">
            <div className="flex justify-center font-mono text-7xl text-center py-10 px-20">
                <h1>{props.currentPrompt}</h1>
            </div>
            <div className="flex flex-row justify-between px-20">
                <button onClick = {props.handleVote0} className="font-mono text-5xl">
                    {props.currentResponse0}
                </button>
                <button onClick = {props.handleVote1} className="font-mono text-5xl">
                    {props.currentResponse1}
                </button>
            </div>
            { (props.currentPrompt === "" || (!props.prompt)) ? <div>Loading ...</div> : <OurTimer startTime = {props.prompt["votingStartTime"]} seconds={20} handleTimeout={props.handleVoteTimeout} />}
        </div>
    );
};

export default VotingSelection;
