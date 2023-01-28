import React from "react";
import { Link } from "@reach/router";
// import GoogleLogin, { GoogleLogout } from "react-google-login";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
// import {GoogleOAuthProvider, GoogleLogin,  GoogleLogout } from "react-google-login";

import {get, post} from "../../utilities";

import "./GameBar.css";
import "../pages/Skeleton.css"
import { navigate } from "@reach/router";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "414404150327-qhpp3e5ihem4nvr38ba1vifiv04633ff.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const GameBar = (props) => {
  const handleLeave = () => {
    if (props.gameID) {
      post("/api/despawn", {gameID: props.gameID}).then((g) => {
        console.log("Player left.");
        navigate("/");
      });
    }
    
  }

  return (
    <nav className="GameBar-container bg-transparent text-black">
      <div className="">
        {!props.game.started && (
        <button className="w-full bg-white hover:bg-red-100 hover:border hover:border-red-400 hover:text-red-700 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick = {handleLeave}>
            <div className="flex flex-row justify-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
              <h1>
                LEAVE GAME
              </h1>
            </div>
            
        </button>
        )}
      </div>

      <div className="flex flex-row space-x-2 justify-center align-center items-center">
        <h1>Game code:</h1>
        <input className="text-3xl w-40 text-center box-content border border-gray-400 rounded text-red" type="text" value={props.gameID} readOnly></input>
      </div>

      <button className="bg-white hover:bg-red-100 hover:border hover:border-red-400 hover:text-red-700 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick = {handleLeave}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </nav>
  );
};

export default GameBar;
