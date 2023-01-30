import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import Prompt from "./Prompt.js";
import Voting from "./Voting.js";
import SidebarUserList from "../modules/SidebarUserList/SidebarUserList.js";
import Round from "./Round.js";

import "../../utilities.css";


/**
 * Define the "App" component
 */
const Ingame = (props) => {
  // console.log("GAMEEE",props.userId);
  // console.log(props.gameID);
  const [currentRound, setCurrentRound] = useState(0);
  return (
    <>      
      <div className="h-screen bg-gray-50">
        <SidebarUserList users={props.game["players"]}/>
        <Router>
            <Prompt path="prompt" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame} currentRound = {currentRound} setCurrentRound = {setCurrentRound}/>
            <Voting path="voting" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame} currentRound = {currentRound} setCurrentRound = {setCurrentRound}/>
            <Round path="round" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame} currentRound = {currentRound} setCurrentRound = {setCurrentRound}/>
        </Router>
      </div>
    </>
  );
};
export default Ingame;
