import React, { useEffect } from "react";

import "../Landing.css";
import "../../../utilities.css";
import { useState } from "react";
import SortedPlayerList from "../../modules/SortedPlayerList";


const VotingResults = (props) => {
    
    // players = {props.game.players}
    // promptText = {currentPrompt}
    // currentResponse0 = {currentResponse0}
    // playersWhoVoted0 = {props.game["prompts"][props.game.votingRound]["response_0_vote"]}
    // currentResponse1 = {currentResponse1}
    // playersWhoVoted1 = {props.game["prompts"][props.game.votingRound]["response_1_vote"]}
    if (!props.userId) {
        return <div>Please Log in</div>;
    }
    if (!props.prompt) {
        return <div>Prompt information not found</div>;
    }
    return (
        <div className="flex flex-col items-center w-full space-x-8">
            <div className="text-5xl md-3">{props.prompt.content}</div>
            <div className="flex-row">
                <div className="flex flex-col">
                    <div className="text-gray-800 font-semibold text-2xl">Response 0: {props.currentResponse0}</div>
                    {
                        props.prompt["response_0_vote_names"].map((player) => {
                            return <div>{player}</div>
                        })
                    }
                </div>
                <div className="flex flex-col">
                    <div className="text-gray-800 font-semibold text-2xl">Response 1: {props.currentResponse1}</div>
                    {
                        props.prompt["response_1_vote_names"].map((player) => {
                            return <div>{player}</div>
                        })
                    } 
                </div> 
            </div>
            <button className="Landing-optionButton justify-right"
            id="Landing-makeGame"
            onClick = {props.handleDoneVoting}>
                Continue to next round!
            </button>
        </div>
    );
    

};

export default VotingResults;
