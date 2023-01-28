import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import Prompt from "./Prompt.js";
import Voting from "./Voting.js";
import SidebarUserList from "../modules/SidebarUserList/SidebarUserList.js";


import "../../utilities.css";


/**
 * Define the "App" component
 */
const Ingame = (props) => {
  // console.log("GAMEEE",props.userId);
  // console.log(props.gameID);
  return (
    <>      
      <div className="h-screen bg-gray-50">
        <SidebarUserList users={props.game["players"]}/>
        <Router>
            <Prompt path=":gameID/prompt" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
            <Voting path=":gameID/voting" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
        </Router>
      </div>
    </>
  );
};
export default Ingame;
