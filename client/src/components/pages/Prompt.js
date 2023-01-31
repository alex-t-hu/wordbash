import React, { useState, useEffect } from "react";

import "../../utilities.css";

import { get, post } from "../../utilities";
import {socket} from "../../client-socket.js";
import { navigate } from "@reach/router";
import OurTimer from "../modules/OurTimer.js";
import PromptQuestion from "../modules/PromptQuestion.js"

import { TypeAnimation } from 'react-type-animation';
import Typed from "react-typed"

/**
 * Define the "Prompt" component
 */
const Prompt = (props) => {

    const [promptNumber, setPromptNumber] = useState(0); // 0, 1, or 2 (done)
    const [currentPrompt, setCurrentPrompt] = useState(""); // the current prompt, text.
    const [prompts, setPrompts] = useState([]);
    const [currentPromptAnim, setCurrentPromptAnim] = useState(""); // the current prompt, text.
    const [value , setValue] = useState(""); // the current value of the input box
    // whether the user has finished answering all the prompts
    const [startedAnswering, setStartedAnswering] = useState(false);
    const [finishedAnswering, setFinishedAnswering] = useState(false);
    const [allFinishedAnswering, setAllFinishedAnswering] = useState(false);
    const [gamePromptAnsweringTime, setGamePromptAnsweringTime] = useState(0);
    const [hasSetPromptAnsweringTime, setHasSetPromptAnsweringTime] = useState(false);

    const promptNumbertoIdx = (k, playerIdx) => {
        const N = props.game["num_Players"];
        const iteration = Math.floor(k / 2);
        // keke return (playerIdx - k*(k^2))
        return (playerIdx -(k % 2) +N)% N + iteration * N;
    };
    /**
     * promptNumber 0, 1, 2, ... number of prompts. promptNumber saved on backend, same for each player.
     * promptNumberToIdx converts promptNumber to the index of the prompt in the array of prompts.
     * for round 1, prompt number is 0 or 1
     * for round 2, prompt number is 2 or 3
     * for round 3, prompt number is 4 or 5 ...
     * playerIdx 0, 1, 2, ... number of players
     * round 1: player 0 answers 0 & -1, player 1 answers 1 & 0, player 2 answers 2 & 1
     * round 2: player 0 answers N & N-1, player 1 answers N+1 & N, player 2 answers N+2 & N+1
     * etc... 
     * instead,
     * round k: player 0 answers (k-1)N - k, (k-1)N
     * also, prompt number should be stored on the backend for each player, so that it is immune to refreshes. currently when players refresh their prompt number gets erased
     * we tell server what playerIdx is so it can deduce which prompts the player answered
     */
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
          if (!hasSetPromptAnsweringTime) { // !hasSetPromptAnsweringTime is stored for each round on the backend. round = promptNumber / 2
            setHasSetPromptAnsweringTime(true);
            // keke setGamePromptAnsweringTime(data['numPlayers'] * 20);
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
                if (!hasSetPromptAnsweringTime) { //!hasSetPromptAnsweringTime is stored for each round on the backend. round = promptNumber / 2
                    setHasSetPromptAnsweringTime(true);
                    // keke setGamePromptAnsweringTime(data['numPlayers'] * 20);
                    setGamePromptAnsweringTime(stuff.game['numPrompts'] * 20);
                  } 
        }};
        socket.on("gameUpdate", callback);
        return () => {
            socket.off("gameUpdate", callback);
        };
    },[]);

    useEffect(() => {
        if (currentPrompt) {
            setCurrentPromptAnim((
                <PromptQuestion sender={"me"} message={
                    currentPrompt
                }/>
            ));
            console.log("dfasdfsdafs");
            console.log(currentPrompt);
        }
    }, [currentPrompt])
    
    const handlePromptTimeout = () => {
        let playerIdx = -1;
        for(let i = 0; i < props.game["num_Players"]; i++){
            if(props.game["players"][i]['id'] === props.userId){
                playerIdx = i;
                break;
            }
        }
        let promptIdx = promptNumbertoIdx(promptNumber, playerIdx);
        console.log("prompt just timed out somehow!!!!");  
        post("/api/submitResponse", {
            gameID: props.gameID,
            // playerIdx: playerIdx,
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
        console.log("user just CLICKKEDDSSDFDSF SUBMIT YEYEYEYE FUCK"); 
        post("/api/submitResponse", {
            gameID: props.gameID,
            // playerIdx: playerIdx,
            promptID: promptIdx,
            timedOut: false,
            response: (value === "") ? "(blank)" : value,
        });
        setPromptNumber(promptNumber + 1);
        setValue("");
        setStartedAnswering(false);
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
    /**
     * if promptNumber is th 
     */
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

    const handleKeyPressed = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    }

    return (
        <div className="w-full h-full flex flex-col p-8">
            <div className="text-left mb-4">
                {currentPromptAnim}
            </div>
            <div className="flex flex-row space-x-4 w-full h-[90px]">
                <div className="flex-grow">
                    <textarea
                        className="Prompt-textarea border rounded-xl p-2"
                        type="text"
                        placeholder="Enter your response here!"
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyPressed}
                    />
                </div>
                <div className="h-full flex items-center justify-center">
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 py-2 border border-gray-400 rounded shadow"
                    type="submit"
                    value="Submit"
                    onClick = {handleSubmit}>
                        Send
                        {/* {promptNumber == 1 ? "Submit" : "Next"} */}
                    </button>
                </div>
            </div>
            
            <div className="flex-grow">
            </div>
            { (gamePromptAnsweringTime === 0 || (!props.game) || (props.game["promptStartTime"]===0)) ? 
                (<div>Loading ...</div>) : 
                (<div className="">
                    <OurTimer startTime = {props.game["promptStartTime"]} seconds={gamePromptAnsweringTime} handleTimeout={handlePromptTimeout} />
                </div>)
            }
        </div>
    );
};

export default Prompt;