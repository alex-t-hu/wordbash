import React, { useEffect } from "react";
import "../../../utilities.css";
import { useState } from "react";
import "../Prompt.css";
import OurTimer from "../../modules/OurTimer.js";
import PromptResponse from "../../modules/PromptResponse";
import PromptQuestion from "../../modules/PromptQuestion";

const VotingSelection = (props) => {

    // const [voted, setVoted] = useState(false); // true if the user has voted on the CURRENT prompt

    // useEffect(() => {
    //     setVoted(props.hasVoted)
    // }, [props.hasVoted])
    
    return (
        <div className="flex flex-col h-full w-full justify-between">
            <div className="flex justify-center text-7xl text-center py-10 px-20">
                <PromptQuestion message={props.currentPrompt} dir={"none"}/>
            </div>
            {props.hasVoted &&  <div className="flex justify-center text-7xl text-center py-10 px-20">
                You have voted! Please wait for other players to vote. If you would like, you can change your response!</div>}
            <div className="flex flex-row justify-between px-20">
                <button onClick = {props.handleVote0} className="text-5xl">
                    {props.currentResponse0 && <PromptResponse message={props.currentResponse0} dir="left"/>}
                </button>
                <button onClick = {props.handleVote1} className="text-5xl">
                    {props.currentResponse1 && <PromptResponse message={props.currentResponse1} dir="right"/>}
                </button>
            </div>
            { (props.currentPrompt === "" || (!props.prompt)) ? <div>Loading ...</div> : <OurTimer startTime = {props.prompt["votingStartTime"]} seconds={300} handleTimeout={props.handleVoteTimeout} />}
        </div>
    );
};

export default VotingSelection;
