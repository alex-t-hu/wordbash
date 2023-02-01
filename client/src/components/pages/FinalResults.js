import React, { useEffect } from "react";


import "../../utilities.css";
import { useState } from "react";
// import SortedPlayerList from "../modules/SortedPlayerList";
import FinalUserList from "../modules/FinalUserList/FinalUserList";
import { get, post } from "../../utilities";

import { navigate } from "@reach/router";
import "./FinalResults.css";
import Confetti from 'react-confetti';

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
        <>
        <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
        />
        <div className="finalResults-container">
            <div className="w-[100%] h-[100%]">
                <FinalUserList className="" users={props.game["players"]}/>
            </div>
            {/* {props.game && props.game["players"] ? <SortedPlayerList players={props.game["players"]}/> : <div>Loading...</div>} */}
            <button className="relative w-[90%] flex justify-center bg-white hover:bg-gray-100 text-3xl text-gray-800 font-semibold py-2 my-2 px-4 border border-gray-400 rounded shadow transition ease-in-out delay-50 hover:scale-[1.05] hover:scale-130 duration-300" onClick = {onSubmit}>
                
                <div>Return to Lobby</div>
            </button> 
        </div>
        </>
    );
    

};

export default FinalResults;
