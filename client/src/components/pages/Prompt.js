import React, { useState, useEffect } from "react";

import "../../utilities.css";

import { get, post } from "../../utilities";
import {socket} from "../../client-socket.js";
import { navigate } from "@reach/router";
import OurTimer from "../modules/OurTimer.js";
/**
 * Define the "Prompt" component
 */
const Prompt = (props) => {

    const [promptNumber, setPromptNumber] = useState(0); // 0, 1, or 2 (done)
    const [currentPrompt, setCurrentPrompt] = useState(""); // the current prompt, text.
    const [value , setValue] = useState(""); // the current value of the input box
    // whether the user has finished answering all the prompts
    const [finishedAnswering, setFinishedAnswering] = useState(false);
    const [allFinishedAnswering, setAllFinishedAnswering] = useState(false);
    const [gamePromptAnsweringTime, setGamePromptAnsweringTime] = useState(0);
    const [hasSetPromptAnsweringTime, setHasSetPromptAnsweringTime] = useState(false);

    const promptNumbertoIdx = (k, playerIdx) => {
        const N = props.game["num_Players"];
        const iteration = Math.floor(k / 2);
        return (playerIdx -(k % 2) +N)% N + iteration * N;
    };

  /**
   * This effect is run every time any state variable changes.
   */
  
  useEffect(() => {
    if(props.userId && props.gameID){
        console.log("blah");
      get("/api/game", {gameID: props.gameID}).then((data) => {
        // console.log("data", data);
        if (props.setGame) {
          props.setGame(data);
        //   console.log("l;kasdjf;lkasdf", data['promptsFinished']);
          setAllFinishedAnswering(data['promptsFinished']);
          if (!hasSetPromptAnsweringTime) {
            setHasSetPromptAnsweringTime(true);
            setGamePromptAnsweringTime(data['numPrompts'] * 20);
          }
        };
      });
    }
  },[props.userId, props.gameID, props.setGame]);
    useEffect(() => {
        const callback = (stuff) => {
            console.log("gah");
            console.log(props.userId, "GAH!", props.gameID);
            if(props.userId && props.gameID){
                props.setGame(stuff.game);
                setAllFinishedAnswering(stuff.game['promptsFinished']);
                if (!hasSetPromptAnsweringTime) {
                    setHasSetPromptAnsweringTime(true);
                    setGamePromptAnsweringTime(data['numPrompts'] * 20);
                  } 
        }};
        socket.on("gameUpdate", callback);
        return () => {
            socket.off("gameUpdate", callback);
        };
    },[]);
    
    const handlePromptTimeout = () => {
        let playerIdx = -1;
        for(let i = 0; i < props.game["num_Players"]; i++){
            if(props.game["players"][i]['id'] === props.userId){
                playerIdx = i;
                break;
            }
        }
        let promptIdx = promptNumbertoIdx(promptNumber, playerIdx);
        post("/api/submitResponse", {
            gameID: props.gameID,
            promptID: promptIdx,
            timedOut: true,
            response: value === "" ? "(blank)" : value,
        }).then( () => {
            setFinishedAnswering(true);
        });
    };
    

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
        let promptIdx = promptNumbertoIdx(promptNumber, playerIdx);
        
        post("/api/submitResponse", {
            gameID: props.gameID,
            promptID: promptIdx,
            timedOut: false,
            response: (value === "") ? "(blank)" : value,
        });
        setPromptNumber(promptNumber + 1);
        setValue("");
    }

    useEffect(() => {
        if(props.game && props.game["started"]){
            let N = props.game["num_Players"];
            let playerIdx = -1;
            for(let i = 0; i < N; i++){
                if(props.game["players"][i]['id'] === props.userId){
                    playerIdx = i;
                    break;
                }
            }
            let promptIdx = promptNumbertoIdx(promptNumber, playerIdx);

            if (promptIdx < props.game["numPrompts"]) {
                // console.log("promptNumber", promptNumber);
                // console.log("playerIdx", playerIdx);
                // console.log("promptNumbertoIdx", promptNumbertoIdx(promptNumber, playerIdx));
                setCurrentPrompt(props.game["prompts"][
                    promptNumbertoIdx(promptNumber, playerIdx)
                ]["content"]);
            } else {
                setCurrentPrompt("");
                setFinishedAnswering(true);
            }
        }
    }, [promptNumber, props.game]);

    useEffect(() => {
        if(props.game){
            if(props.game.promptsFinished){
                navigate(`/game/${props.gameID}/voting`);
            }
        }
    }, [allFinishedAnswering, props.game, finishedAnswering]);


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
                <h2>{currentPrompt}</h2>
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
                    Submit
                    {/* {promptNumber == 1 ? "Submit" : "Next"} */}
                </button>
            </div>
            {gamePromptAnsweringTime === 0 ? <div>Loading ...</div> : <OurTimer seconds={gamePromptAnsweringTime} handleTimeout={handlePromptTimeout} />}
        </div>
    );
};

export default Prompt;