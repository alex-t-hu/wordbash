import React, { useEffect } from "react";

import "./Landing.css";
import "../../utilities.css";
import { useState } from "react";
import SortedPlayerList from "../modules/SortedPlayerList";
import { get, post } from "../../utilities";

import { navigate } from "@reach/router";



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
        console.log("game is ", props.game);
    });

    const onSubmit = ()=> {
        if(props.userId && props.gameID){
            post("/api/rejoinGame", {gameID: props.gameID}).then((data) => {
                navigate(`/game/${props.gameID}/lobby`);
            });
        }
    }
    return (
        <div>
            <h3>Final Results</h3>
            {props.game && props.game["players"] ? <SortedPlayerList players={props.game["players"]}/> : <div>Loading...</div>} 
            <button className="Landing-optionButton u-flex-alignCenter" id="Landing-makeGame" onClick = {onSubmit}>
                What you egg
            </button>
        </div>
    );
    

};

export default FinalResults;
