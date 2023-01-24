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
        <div>
            <h3>Results</h3>
            <SortedPlayerList players={props.players}/>
            <button className="Landing-optionButton u-flex-alignCenter"
            id="Landing-makeGame"
            onClick = {props.handleDoneVoting}>
                Play Again?
            </button>
        </div>
    );
    

};

export default VotingResults;
