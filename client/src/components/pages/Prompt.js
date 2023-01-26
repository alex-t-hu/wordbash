import React, { useState, useEffect } from "react";

import "../../utilities.css";

import { get, post } from "../../utilities";
import {socket} from "../../client-socket.js";
import { navigate } from "@reach/router";
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
    const [startTime, setStartTime] = useState(0);
    const [seconds, setSeconds] = useState(20);
    const [minutes, setMinutes] = useState(0);
    const [stringSeconds, setStringSeconds] = useState("20");
    const [stringMinutes, setStringMinutes] = useState("00");
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
          console.log("l;kasdjf;lkasdf", data['promptsFinished']);
          setAllFinishedAnswering(data['promptsFinished']);
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
            // get("/api/game", {gameID: props.gameID}).then((data) => {
            //   // console.log("data", data);
            //   if (props.setGame) {
            //     props.setGame(data);
            //     console.log("blah", data['promptsFinished']);
            //     setAllFinishedAnswering(data['promptsFinished']);
            //   };
            // });
        }};
        socket.on("gameUpdate", callback);
        return () => {
            socket.off("gameUpdate", callback);
        };
    },[]);
    const padNum = (num) => {
        let zero = '00';
        return (zero + num).slice(-2);
    };
    const handlePromptTimeout = () => {
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
            timedOut: true,
            response: value == "" ? "(blank)" : value,
        });
        setFinishedAnswering(true);
    };
    useEffect(() => {
        
        const interval = setInterval(() => {
            console.log("BLAHGAH!");
            if (seconds === 0 && minutes === 0) {
                handlePromptTimeout();
            } else {
                if (minutes > 0 && seconds > 0) {
                    setSeconds(seconds-1);

                } else if (minutes > 0 && seconds === 0) {
                    setMinutes(minutes-1);
                    setSeconds(59);


                } else {
                    setSeconds(seconds-1);

                }
                setStringMinutes( padNum(minutes) );
                setStringSeconds( padNum(seconds));
            }
        },1000);
        return () => {
            clearInterval(interval);
        };
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
            timedOut: false,
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
                navigate(`/game/${props.gameID}/voting`);
            }
        }
    }, [allFinishedAnswering]);


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
            <div class="w-24 mx-1 p-2 bg-white text-yellow-500 rounded-lg">
                <div class="font-mono leading-none">{stringMinutes}:{stringSeconds}</div>
            </div>
        </div>
    );
};

export default Prompt;