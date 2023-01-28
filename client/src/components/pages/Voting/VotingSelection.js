import React, { useEffect } from "react";
import "../../../utilities.css";
import { useState } from "react";
import "../Prompt.css";
import OurTimer from "../../modules/OurTimer.js";

const VotingSelection = (props) => {

    
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
            <OurTimer seconds={20} handleTimeout={props.handleVoteTimeout}/>
        </div>
    );
};

export default VotingSelection;
