import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";
import "../../../../server/game-logic.js";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/NavBar.js"
import Profile from "./pages/Profile.js";
import Lobby from "./pages/Lobby.js";
import Landing from "./pages/Landing.js";


import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const Prompt = (props) => {
//   const [userId, setUserId] = useState(undefined);

  
//   const [gameID, setGameID] = useState("");

//   const [game, setGame] = useState(undefined);


  // called whenever the user types in the new post input box
  // const handleIDChange = (value) => {
  //   setGameID(value);
  // };
  const [game, setGame] = useState(undefined);
  const [userGameId, setUserGameId] = useState(0);
  const [firstPrompt, setFirstPrompt] = useState("");
  const [secondPrompt, setSecondPrompt] = useState("");
  const [firstResponse, setFirstResponse] = useState("");
  const [secondResponse, setSecondResponse] = useState("");
    const [hasAnsweredFirst, setHasAnsweredFirst] = useState(false);
    useEffect(() => {
        get("/api/getGame", { gameID: props.gameID }).then((game) => {
            setUserGameId(game["players"][props.userId]["id"]);
            firstPrompt = game["prompts"][userGameId]["prompt_0"];
            secondPrompt = game["prompts"][(userGameId +1)% game["num_players"]]["prompt_1"];
        });
    }, []);

if (hasAnsweredFirst) {
    return (
        

    )
} else{
    return (

    )

}
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
          <NotFound default />
        </Router>
      </div>
    </>
  );
};
// return (
//   <>
//     <NavBar
//       handleLogin={handleLogin}
//       handleLogout={handleLogout}
//       userId={userId}
//     />
//     <div className="App-container">
//       <Router>
//         <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
//         <Profile path="/profile/:userId" />
//         <NotFound default />
//       </Router>
//     </div>
//   </>
// );

export default App;