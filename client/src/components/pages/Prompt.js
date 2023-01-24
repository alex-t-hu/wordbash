import React, { useState, useEffect } from "react";

import "../../utilities.css";

import { get, post } from "../../utilities";

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
  const [finishedAnswering, setFinishedAnswering] = useState(false);
    useEffect(() => {
        get("/api/getGame", { gameID: props.gameID }).then((game) => {
            setUserGameId(game["players"][props.userId]["id"]);
            firstPrompt = game["prompts"][userGameId]["prompt_0"];
            secondPrompt = game["prompts"][(userGameId -1+game["num_players"])% game["num_players"]]["prompt_1"];
        });
    }, []);
    useEffect(() => {
        if (finishedAnswering && props.game.promptsFinished) {
            return <div>Everyone's finished answering</div>
        }
    });

if (finishedAnswering) {
    return (
        <div className="Prompt-container">
            <div className="Prompt-prompt">
                <h1>Waiting for other players to finish...</h1>
            </div>
        </div>
    );
}
else if (hasAnsweredFirst) {
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
                        setFinishedAnswering(true);
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
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
};
export default Prompt;