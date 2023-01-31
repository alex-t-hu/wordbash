import React, { useEffect } from "react";
import "../../../utilities.css";
import { useState } from "react";
import "../Prompt.css";
import OurTimer from "../../modules/OurTimer.js";

const VotingSelection = (props) => {

    // const [voted, setVoted] = useState(false); // true if the user has voted on the CURRENT prompt

    // useEffect(() => {
    //     setVoted(props.hasVoted)
    // }, [props.hasVoted])
    
    return (
        <div className="flex flex-col h-full w-full justify-between">
            <div className="flex justify-center font-mono text-7xl text-center py-10 px-20">
                <h1>{props.currentPrompt}</h1>
            </div>
            {props.hasVoted &&  <div className="flex justify-center font-mono text-7xl text-center py-10 px-20">
You have voted! Please wait for other players to vote. If you would like, you can change your response!</div>}
            <div className="flex flex-row justify-between px-20">
                <button onClick = {props.handleVote0} className="font-mono text-5xl">
                    {props.currentResponse0}
                </button>
                <button onClick = {props.handleVote1} className="font-mono text-5xl">
                    {props.currentResponse1}
                </button>
            </div>
            { (props.currentPrompt === "" || (!props.prompt)) ? <div>Loading ...</div> : <OurTimer startTime = {props.prompt["votingStartTime"]} seconds={300} handleTimeout={props.handleVoteTimeout} />}
        </div>
    );
};

export default VotingSelection;
