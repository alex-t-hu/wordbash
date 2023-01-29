import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import GameBar from "../modules/GameBar.js";

import Lobby from "./Lobby.js";
import FinalResults from "./FinalResults.js";
import Ingame from "./Ingame.js";

import Chatbook from "./Chatbook.js";


import "../../utilities.css";


/**
 * Define the "App" component
 */
const Game = (props) => {
  // console.log("GAMEEE",props.userId);
  // console.log(props.gameID);
  return (
    <>      
      <div className="h-screen flex flex-col bg-gray-50">
        <GameBar userId={props.userId} gameID={props.gameID} game={props.game} setGame={props.setGame}/>
        <div className="h-screen flex flex-row">
          <div className="w-[30%] h-screen">
            <Chatbook userId={props.userId} gameID={props.gameID} game={props.game} setGame={props.setGame}/>
          </div>
          <div className="w-full">
            <Router>
              <Lobby path=":gameID/lobby" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
              <FinalResults path=":gameID/results" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
              <Ingame path="/*" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
            </Router>
        </div>
          </div>
          
      </div>
    </>
  );
};
export default Game;
