import React, { useEffect } from "react";

import "./Landing.css";
import "../../utilities.css"
import { useState } from "react";

import { get, post } from "../../utilities";
import { PromiseProvider } from "mongoose";


const VotingResults = (props) => {
    const [playerList, setPlayerList] = useState([]);
    useEffect(() => {
        // setPlayerList(props.game.players);
        // sort props.game.players by score and set it to playerList
        // change props.game.players from dictionary to list of players
        let sortedPlayers = Object.keys(props.game.players).map((key) => {
            return [key, props.game.players[key]];
        });
        sortedPlayers.sort((a, b) => {return b['score']});
        console.log("sortedPlayers ", sortedPlayers);
        setPlayerList(sortedPlayers);
    }, []); // see game-logic.js for the structure of game
    if (!props.userId) {
        return <div>Please Log in</div>;
    }
    useEffect(() => {
        if(props.game.votingResultsFinished) {
            window.location.href = `/finalresults/`; 
        }
    },[props.game.votingResultsFinished]);

    function handleSubmit() {   
        // post("/api/playAgain", {gameID: props.gameID, userId: props.userId}).then((g) => {
        //     console.log("Play Again Successfully");
        //     window.location.href = `/lobby/`;
        // });
        props.game.votingResultsFinished = true;
    }
    
    return (
        <div>
            <h3>Results</h3>
            {playerList.map((playerId, playerInfo) => (
                <div>
                    <p>{playerId}</p>
                    <p>{playerInfo["score"]}</p>
                </div>
            ))}
            {props.game.hostPlayer===props.userId && <button className="Landing-optionButton u-flex-alignCenter" id="Landing-makeGame" onClick = {handleSubmit}>
                Play Again?
            </button>}
        </div>
    );
    

};

export default VotingResults;
