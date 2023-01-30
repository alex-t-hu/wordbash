import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import GameBar from "../modules/GameBar.js";

import Lobby from "./Lobby.js";
import FinalResults from "./FinalResults.js";
import Ingame from "./Ingame.js";

import Chatbook from "./Chatbook.js";
import Background from "../modules/Background.js"

import Collapsible from 'react-collapsible';

import "../../utilities.css";


/**
 * Define the "App" component
 */
const Game = (props) => {
  // console.log("GAMEEE",props.userId);
  // console.log(props.gameID);

  const [chatOpen, setChatOpen] = useState(true);
  return (
    <>      
      <div className="h-screen flex flex-col">
        <GameBar userId={props.userId} gameID={props.gameID} game={props.game} setGame={props.setGame}/>
        <div className="h-full flex flex-row">
          <div className="h-full w-full">
            <Router>
              <Lobby path=":gameID/lobby" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
              <FinalResults path=":gameID/results" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
              <Ingame path="/*" userId={props.userId} gameID ={props.gameID} game = {props.game} setGame = {props.setGame}/>
            </Router>
          </div>

          <div className="flex flex-col justify-end">
            <button
              className="bg-white w-[70px] hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex text-l text-black items-center cursor-pointer bottom-6 z-50"
              onClick={() => setChatOpen(!chatOpen)}
            >
              {chatOpen ? (
                <h1>{"Chat <"}</h1>
              ) : (
                <h1>{"Chat >"}</h1>
              )}
            </button>
          </div>
          
          <div className={`bg-[#EEEEEE] right-0 text-white z-20 ease-in-out duration-300 
          ${
            chatOpen ? "w-0" : "w-[30%]"
          }`}>
            <Chatbook userId={props.userId} gameID={props.gameID} game={props.game} setGame={props.setGame}/>
          </div>
          

        </div>
        <Background />
      </div>
    </>
  );
};
export default Game;
