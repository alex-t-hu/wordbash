import React, { useEffect } from "react";

// import "./Landing.css";
import "../../utilities.css";
import { useState } from "react";

/**
 * 
 * @param {*} props : Send me the players from game pls.
 * @returns 
 */
const SortedPlayerList = (props) => {
    const [playerList, setPlayerList] = useState([]);
    useEffect(() => {
        // setPlayerList(props.game.players);
        // sort props.game.players by score and set it to playerList
        // change props.game.players from dictionary to list of players
        if (props.players) {
            let sortedPlayers = Object.keys(props.players).map((key) => {
                return [key, props.players[key]];
            });
            sortedPlayers.sort((a, b) => {return a[1]['score'] - b[1]['score']});
            // console.log("sortedPlayers ", sortedPlayers);
            setPlayerList(sortedPlayers);
        }
        
    }, [props.players]); // see game-logic.js for the structure of game
    const determinePlace = (place) => {
        place += 1;
        if (place === 1) {
            return "1st";
        } else if (place === 2) {
            return "2nd";
        } else if (place === 3) {
            return "3rd";
        } else {
            return place + "th";
        }
    }
    return (
        <div>
            {playerList.map( (x, idx) => (
                <div>
                    <p>{determinePlace(idx)} place: </p>
                    <p>{x[1]["id"]} with {x[1]["score"]} points</p>
                </div>
            ))}
        </div>
    );
};

export default SortedPlayerList;
