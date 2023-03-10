import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import Game from "./pages/Game.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import { navigate } from "@reach/router";


/**
 * Define the "App" component
 */
const App = () => {
  document.title = "Wordbash";
  const [userId, setUserId] = useState("");
  // const [gameID, setGameID] = useState("");
  
  // useEffect(() => {
  //   // console.log`Game ID set in App! Game ID = ${gameID}`);
  // }, [gameID]);
  
  // useEffect(() => {
  //   // console.log`User ID set in App! User ID = ${userId}`);
  // }, [userId]);

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
    // console.log`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    // console.log"Logged out successfully!");
    setUserId(null);
    post("/api/logout");
    navigate("/");
  };

  return (
    <>
      <div className="App-container h-screen">
        <Router className="h-full">
          <Home path="/*" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId}/>
          {/*  gameID={gameID} setGameID={setGameID}/> */}
          <Game path="/game/:gameID/*" userId={userId} />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};
export default App;
