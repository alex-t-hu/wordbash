import React, { useEffect } from "react";

import "./Landing.css";
import "../../utilities.css";
import { useState } from "react";



const FinalResults = (props) => {
    const [playerList, setPlayerList] = useState([]);
    if (!props.userId) {
        return <div>Please Log in</div>;
    }

    useEffect(() => {
        // setPlayerList(props.game.players);
        // sort props.game.players by score and set it to playerList
        // change props.game.players from dictionary to list of players
        if (props.game) {
            let sortedPlayers = Object.keys(props.game.players).map((key) => {
                return [key, props.game.players[key]];
            });
            sortedPlayers.sort((a, b) => {return a[1]['score'] - b[1]['score']});
            console.log("sortedPlayers ", sortedPlayers);
            setPlayerList(sortedPlayers);
        }
    }, []); // see game-logic.js for the structure of game
    
    const onSubmit = ()=> {   
        // post("/api/playAgain", {gameID: props.gameID, userId: props.userId}).then((g) => {
        //     console.log("Play Again Successfully");
        //     window.location.href = `/lobby/`;
        // });
        window.location.href = `/lobby/`;
    }
    
    return (
        <div>
            <h3>Results</h3>
            {playerList.map((playerId, playerInfo) => {(
                <div>
                    <p>{playerId}</p>
                    <p>{playerInfo["score"]}</p>
                </div>
            )})}
            {props.game.hostPlayer===props.userId && <button className="Landing-optionButton u-flex-alignCenter" id="Landing-makeGame" onClick = {onSubmit}>
                Play Again?
            </button>}
        </div>
    );
    

};

export default FinalResults;
