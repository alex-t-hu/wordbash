import React, { useEffect } from "react";

import "../Landing.css";
import "../../../utilities.css";
import { useState } from "react";
import SortedPlayerList from "../../modules/SortedPlayerList";


const VotingResults = (props) => {
    if (!props.userId) {
        return <div>Please Log in</div>;
    }
    if (!props.players) {
        return <div>Game not found</div>;
    }
    return (
        <div className="flex flex-col items-center w-full space-x-8">
            <div className="text-5xl md-3">{props.promptText}</div>
            <div className="flex-row">
                <div className="flex flex-col">
                    <div className="text-gray-800 font-semibold text-2xl">Response 0: {props.currentResponse0}</div>
                    {
                        props.playersWhoVoted0.map((player) => {
                            return <div>{player}</div>
                        })
                    }
                </div>
                <div className="flex flex-col">
                    <div className="text-gray-800 font-semibold text-2xl">Response 1: {props.currentResponse1}</div>
                    {
                        props.playersWhoVoted1.map((player) => {
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
