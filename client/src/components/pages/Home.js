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
  return (
    <>
      <div className="h-full">
        <div className="z-20">
            <NavBar
                handleLogin={props.handleLogin}
                handleLogout={props.handleLogout}
                userId={props.userId}
                className="z-40"
            />
        </div>
        <div className="z-10">
            <Router>
                <Landing path="/" userId={props.userId} gameID ={props.gameID} setGameID = {props.setGameID} handleLogin = {props.handleLogin}/>
                <Profile path="/profile/:userId" />
            </Router>
        </div>
      </div>
    </>
  );
};
export default Home;
