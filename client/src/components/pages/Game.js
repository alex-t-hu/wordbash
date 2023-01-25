import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import Lobby from "./Lobby.js";
import Prompt from "./Prompt.js";
import Voting from "./Voting.js";
import FinalResults from "./FinalResults.js";


import "../../utilities.css";


/**
 * Define the "App" component
 */
const Game = (props) => {
  return (
    <>
      <div className="">
        <Router>
            <Lobby path=":gameID/lobby" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
            <Prompt path=":gameID/prompt" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
            <FinalResults path=":gameID/results/:gameID" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
            <Voting path=":gameID/voting" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
        </Router>
      </div>
    </>
  );
};
export default Game;
