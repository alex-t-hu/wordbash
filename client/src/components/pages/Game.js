import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import GameBar from "../modules/GameBar.js";

import Lobby from "./Lobby.js";
import FinalResults from "./FinalResults.js";
import Ingame from "./Ingame.js";


import "../../utilities.css";


/**
 * Define the "App" component
 */
const Game = (props) => {
  // console.log("GAMEEE",props.userId);
  // console.log(props.gameID);
  return (
    <>      
      <div className="h-screen bg-gray-50">
        <GameBar userId={props.userId} gameID={props.gameID} game={props.game} setGame={props.setGame}/>
        <Router>
            <Lobby path=":gameID/lobby" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
            <FinalResults path=":gameID/results" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
            <Ingame path="/*" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
        </Router>
      </div>
    </>
  );
};
export default Game;
