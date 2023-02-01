import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import GameBar from "../modules/GameBar.js";

import Lobby from "./Lobby.js";
import FinalResults from "./FinalResults.js";
import Ingame from "./Ingame.js";

import Chatbook from "./Chatbook.js";
import Background from "../modules/Background.js"
import Background2 from "../modules/Background2.js"
const randomColor = require("randomcolor");

import Collapsible from 'react-collapsible';

import { Resizable, Draggable } from 'react-resizable';

import "../../utilities.css";
import { navigate } from "@reach/router";


/**
 * Define the "App" component
 */
const Game = (props) => {
  // console.log("GAMEEE",props.userId);
  // console.log(props.gameID);
  const [color1, setColor1] = useState(randomColor());
  const [color2, setColor2] = useState(randomColor());
  const [color3, setColor3] = useState(randomColor());
  const [color4, setColor4] = useState(randomColor());
  const [dims, setDims] = useState([200, 200]);

  const [game, setGame] = useState({});
  useEffect(() => {
    document.title = "Wordbash";
  }, []);
  useEffect(() => {
    console.log("Inside Game.js, Game ID is"  + props.gameID);
  }, [props.gameID]);

  // On top layout
  const onResize = (event, {element, size, handle}) => {
    setDims([size.width, size.height]);
  };

  const [chatOpen, setChatOpen] = useState(true);

  return (
    <>
      <div className="h-full flex flex-col">
        <div>
          <GameBar userId={props.userId} gameID={props.gameID} game={game} setGame={setGame}/>
        </div>
        <div className="flex flex-row flex-grow overflow-y-scroll overflow-x-hidden">
          <Router className="h-full w-full">
            <Lobby path="lobby" userId={props.userId} gameID ={props.gameID} game = {game} setGame = {setGame}/>
            <FinalResults path="results" userId={props.userId} gameID ={props.gameID} game = {game} setGame = {setGame}/>
            <Ingame path="*" userId={props.userId} gameID ={props.gameID} game = {game} setGame = {setGame}/>
          </Router>
          <div className="h-full flex flex-col justify-end w-0 right-8 bottom-8">
            <button
              className={`${chatOpen ? 
                "ease-in-out duration-500 -translate-x-full bg-gray-50 bg-opacity-0 hover:bg-opacity-30 border border-gray-500": 
                "ease-in-out duration-500 -translate-x-full bg-blue-500 hover:bg-blue-400"
              } w-14 h-14 font-semibold py-2 px-4 rounded-full shadow flex text-l items-center cursor-pointer bottom-6 z-50`}
              onClick={() => setChatOpen(!chatOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" color={`${chatOpen ? "black" : "white"}`} stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </button>
          </div>
          
          <div className={`right-0 text-white z-20 ease-in-out duration-500 
          ${
            chatOpen ? "w-[30%]" : "w-0"
          }`}>
            <Chatbook userId={props.userId} gameID={props.gameID} game={game} setGame={setGame}/>
          </div>
        </div>
        {/* <Background2 className="-z-20" direction={"y"} colorX={["#ffddb4","#fcd0d0"]} colorY={["#ffddb4","#fcd0d0"]}/> */}
        <Background2 className="-z-20" direction={"y"} colorX={[color1,color2]} colorY={[color3,color4]}/>
      </div>
    </>
  );
};
export default Game;
