import React, { useState, useEffect } from "react";

import "../../utilities.css";

import { get, post } from "../../utilities";

/**
 * Define the "Prompt" component
 */
const Prompt = (props) => {

    const [promptNumber, setPromptNumber] = useState(0); // 0, 1, or 2 (done)
    const [currentPrompt, setCurrentPrompt] = useState(""); // the current prompt, text.
    const [value , setValue] = useState(""); // the current value of the input box
    // whether the user has finished answering all the prompts
    const [finishedAnswering, setFinishedAnswering] = useState(false);

  /**
   * This effect is run every time any state variable changes.
   */
  
  useEffect(() => {
    if(props.userId && props.gameID){
      get("/api/game", {gameID: props.gameID}).then((data) => {
        // console.log("data", data);
        if (props.setGame) {
          props.setGame(data);
        };
      });
    }
  });


    // called whenever the user types in the input box
    const handleChange = (event) => {
        console.log(event);
        setValue(event.target.value);
    };

    // called when the user hits "Submit"
    const handleSubmit = (event) => {
        event.preventDefault();
        
        let playerIdx = -1;
        for(let i = 0; i < props.game["num_Players"]; i++){
            if(props.game["players"][i]['id'] === props.userId){
                playerIdx = i;
                break;
            }
        }
        let promptIdx = (playerIdx -promptNumber+props.game["num_Players"])% props.game["num_Players"]
        
        post("/api/submitResponse", {
            gameID: props.gameID,
            promptID: promptIdx,
            response: value == "" ? "(blank)" : value,
        });
        setPromptNumber(promptNumber + 1);
        setValue("");
    }

    useEffect(() => {
        if(props.game && props.game["started"]){
            let playerIdx = -1;
            for(let i = 0; i < props.game["num_Players"]; i++){
                if(props.game["players"][i]['id'] === props.userId){
                    playerIdx = i;
                    break;
                }
            }
            let promptIdx = (playerIdx -promptNumber+props.game["num_Players"])% props.game["num_Players"];
            // console.log("promptIdx", promptIdx);
            // console.log("promptNumber", promptNumber);
            // console.log("props.game", props.game);
            if (promptNumber === 0) {
                setCurrentPrompt(props.game["prompts"][promptIdx]["content"]);
            } else if (promptNumber === 1) {
                setCurrentPrompt(
                    props.game["prompts"][promptIdx]["content"]
                );
            } else {
                setCurrentPrompt("");
                setFinishedAnswering(true);
            }
        }
    }, [promptNumber, props.game]);

    useEffect(() => {
        if(props.game){
            if(props.game.promptsFinished){
                window.location.href = `/game/${props.gameID}/voting`;
            }
        }
    }, [props.game]);


    if(!props.game){
        return <div>Loading...</div>
    }

    if (finishedAnswering) {
        // if(props.game.promptsFinished){
        //     return <div>Everyone's finished answering</div>
        // }
        return (
            <div className="Prompt-container">
                <div className="Prompt-prompt">
                    <h1>Waiting for other players to finish...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="Prompt-container bg-gradient-to-r from-indigo-300 via-blue-300 to-indigo-300 p-8">
            <div className="Prompt-prompt mb-4">
                <h1>{currentPrompt}</h1>
            </div>
            <div className="Prompt-response">
                <textarea
                    className="Prompt-textarea"
                    type="text"
                    placeholder="Enter your response here"
                    value={value}
                    onChange={handleChange}
                />
            </div>
            <div className="float-right">
                <button className="m-8 align-right bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                type="submit"
                value="Submit"
                onClick = {handleSubmit}>
                    {promptNumber == 1 ? "Submit" : "Next"}
                </button>
            </div>
        </div>
    );
};

export default Prompt;