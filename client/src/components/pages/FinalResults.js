import React, { useEffect } from "react";

import "./Landing.css";
import "../../utilities.css";
import { useState } from "react";
import SortedPlayerList from "../modules/SortedPlayerList";



const FinalResults = (props) => {
    const onSubmit = ()=> {
        window.location.href = `/`;
    }
    return (
        <div>
            <h3>Final Results</h3>
            <SortedPlayerList players={props.game.players}/>
            <button className="Landing-optionButton u-flex-alignCenter" id="Landing-makeGame" onClick = {onSubmit}>
                What you egg
            </button>
        </div>
    );
    

};

export default FinalResults;
