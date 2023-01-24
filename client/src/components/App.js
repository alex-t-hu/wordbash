import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js"
import Profile from "./pages/Profile.js";
import Lobby from "./pages/Lobby.js";
import Prompt from "./pages/Prompt.js";
import Landing from "./pages/Landing.js";
import Voting from "./pages/Voting.js";
import VotingResults from "./pages/VotingResults.js";
import FinalResults from "./pages/FinalResults.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";


/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [gameID, setGameID] = useState(undefined);
  const [game, setGame] = useState(undefined);
  
  useEffect(() => {
    console.log(`Game ID set in App! Game ID = ${gameID}`);
  }, [gameID]);
  
  useEffect(() => {
    console.log(`User ID set in App! User ID = ${userId}`);
  }, [userId]);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    setUserId(null);
    post("/api/logout");
  };

  return (
    <>
      <div className="App-container">
        <NavBar
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          userId={userId}
        />
        <Router>
          <Landing path="/" userId={userId} gameID ={gameID} setGameID = {setGameID}/>
          <Profile path="/profile/:userId" />
          <Lobby path="/lobby/:gameID" userId={userId} gameID ={gameID} game = {game} setGame = {setGame}/>
          <Prompt path="/prompt/:gameID" userId={userId} gameID ={gameID} game = {game} setGame = {setGame}/>
          <Voting path="/voting/:gameID" userId={userId} gameID ={gameID} game = {game} setGame = {setGame}/>
          <VotingResults path="/votingresults/:gameID" userId={userId} gameID ={gameID} game = {game} setGame = {setGame}/>
          <FinalResults path="/finalresults/:gameID" userId={userId} gameID ={gameID} game = {game} setGame = {setGame}/>
          <NotFound default />
        </Router>
      </div>
    </>
  );
};
export default App;
