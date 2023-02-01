import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import NavBar from "../modules/NavBar.js"
import Profile from "./Profile.js";
import Landing from "./Landing.js";
import Background from "../modules/Background.js"

import "../../utilities.css";


/**
 * Define the "App" component
 */
const Home = (props) => {
  const [inProfile, setInProfile] = useState(false);

  return (
    // <>
      <div className="h-full flex flex-col">
        <div className="z-20">
            <NavBar
                handleLogin={props.handleLogin}
                handleLogout={props.handleLogout}
                userId={props.userId}
                className="z-40"
                inProfile={inProfile}
                setInProfile={setInProfile}
            />
        </div>
        <div className="z-10 flex-grow">
            <Router className = "h-full">
              {/*  gameID ={props.gameID} setGameID = {props.setGameID} */}
                <Landing path="/" userId={props.userId} handleLogin = {props.handleLogin}/> 
                <Profile path="/profile/:userId" setInProfile={setInProfile}/>
            </Router>
        </div>
      </div>
    // </>
  );
};
export default Home;
