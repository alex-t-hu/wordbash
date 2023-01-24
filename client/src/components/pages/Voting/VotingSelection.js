import React, { useEffect } from "react";
import "../../../utilities.css";
import { useState } from "react";



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
    </div>
    );
};

export default VotingSelection;
