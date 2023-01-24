import React, { useEffect } from "react";

import "./Landing.css";
import "../../utilities.css";
import { useState } from "react";
import SortedPlayerList from "../modules/SortedPlayerList";
import { get, post } from "../../utilities";



const FinalResults = (props) => {
    
    /**
     * This effect is run every time any state variable changes.
     */
    
    useEffect(() => {
        if(props.userId && props.gameID){
            get("/api/game", {gameID: props.gameID}).then((data) => {
                // console.log("data", data);
                if (props.setGame) {
                props.setGame(data);
                };
            });
        }
    });
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
