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
        <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
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
      </div>
      <div className="flex items-center GameBar-linkContainer">
        {props.userId && (
          <Link to={`/profile/${props.userId}`} className="GameBar-link">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
        )}
        
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {props.userId ? (
            <button
              onClick={() => {
                googleLogout();
                props.handleLogout();
              }}
              className="GameBar-link"
            >
              {/* TODO: this stuff gives errors for some reason?  Like classname -> class? stroke-width -> strokeWidth?*/}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>

            </button>
          ) : (
            <></>
          )}
        </GoogleOAuthProvider> 
          
      </div>
    </nav>
  );
};

export default GameBar;
