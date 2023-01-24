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
            secondPrompt = game["prompts"][(userGameId -1+game["num_players"])% game["num_players"]]["prompt_1"];
        });
    }, []);

if (hasAnsweredFirst) {
    return (
        <div className="Prompt-container">
            <div className="Prompt-prompt">
                <h1>{secondPrompt}</h1>
            </div>
            <div className="Prompt-response">
                <textarea
                    className="Prompt-textarea"
                    type="text"
                    placeholder="Enter your response here"
                    value={secondResponse}
                    onChange={(event) => {
                        setSecondResponse(event.target.value);
                    }}
                />
            </div>
            <div className="Prompt-button">
                <button
                    className="Prompt-button"
                    type="submit"
                    value="Submit"
                    onClick={() => {
                        post("/api/submitResponse", {
                            gameID: props.gameID,
                            playerID: userGameId,
                            response: secondResponse,
                        });
                        props.setGame({
                            ...props.game,
                            responses: {
                                ...props.game.responses,
                                [userGameId]: secondResponse,
                            },
                        });
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
} else{
    return (
        <div className="Prompt-container">
            <div className="Prompt-prompt">
                <h1>{firstPrompt}</h1>
            </div>
            <div className="Prompt-response">
                <textarea
                    className="Prompt-textarea"
                    type="text"
                    placeholder="Enter your response here"
                    value={firstResponse}
                    onChange={(event) => {
                        setFirstResponse(event.target.value);
                    }}
                />
            </div>
            <div className="Prompt-button">
                <button
                    className="Prompt-button"
                    type="submit"
                    value="Submit"
                    onClick={() => {
                        post("/api/submitResponse", {
                            gameID: props.gameID,
                            playerID: userGameId,
                            response: firstResponse,
                        });
                        props.setGame({
                            ...props.game,
                            responses: {
                                ...props.game.responses,
                                [userGameId]: firstResponse,
                            },
                        });
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
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

export default Prompt;