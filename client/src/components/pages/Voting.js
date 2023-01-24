import React, { useEffect } from "react";

import "./Landing.css";

import "./Prompt.css";
import "../../utilities.css";
import { useState } from "react";

import { get, post } from "../../utilities";



const Voting = (props) => {
    /**
     * For testing purposes, we allow all users to vote on all prompts.
     * In the future, we will only allow the user to vote on other users' prompts.
     */
    
    const [promptNumber, setPromptNumber] = useState(-1); // 0, 1, or 2 (done)
    const [voted, setVoted] = useState(false); // true if the user has voted on the CURRENT prompt
    const [currentPrompt, setCurrentPrompt] = useState(""); // the current prompt, text.
    const [currentResponse0 , setCurrentResponse0] = useState(""); // Reponse 0
    const [currentResponse1 , setCurrentResponse1] = useState(""); // Reponse 1


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

    useEffect(() => {
        if(props.game.votingRound !== promptNumber){
            setPromptNumber(props.game.votingRound);
            setVoted(false);
        }
    }, [props.game]);


    useEffect(() => {
        if(props.game && props.game["promptsFinished"]){
            if(props.game.votingRound < props.game["num_Players"]){
                setCurrentPrompt(props.game["prompts"][props.game.votingRound]["content"]);
                setCurrentResponse0(props.game["prompts"][props.game.votingRound]["response_0_answer"]);
                setCurrentResponse1(props.game["prompts"][props.game.votingRound]["response_1_answer"]);
            }else{
                setCurrentPrompt("");
                setCurrentResponse0("");
                setCurrentResponse1("");
            }
        }
    }, [promptNumber, props.game]);

    useEffect(() => {
        if(props.game.votingFinished) {
            window.location.href = `/votingresults/${props.gameID}`;
        }
    }, [props.game]); // see game-logic.js for the structure of game
    // called when the user hits "Submit" for a new post



    const handleVote0 = (event) => {
        event.preventDefault();
        
        // let playerIdx = -1;
        // for(let i = 0; i < props.game["num_Players"]; i++){
        //     if(props.game["players"][i]['id'] === props.userId){
        //         playerIdx = i;
        //         break;
        //     }
        // }
        
        post("/api/submitVote", {
            gameID: props.gameID,
            promptID: promptNumber,
            response: 0,
        }).then(
            setVoted(true)
        );
    };
    const handleVote1 = (event) => {
        event.preventDefault();
        
        // let playerIdx = -1;
        // for(let i = 0; i < props.game["num_Players"]; i++){
        //     if(props.game["players"][i]['id'] === props.userId){
        //         playerIdx = i;
        //         break;
        //     }
        // }
        
        post("/api/submitVote", {
            gameID: props.gameID,
            promptID: promptNumber,
            response: 1,
        }).then(
            setVoted(true)
        );
    };
    if (!props.userId) {
        return <div>Please Log in</div>;
    }
    if(voted){
        return <div>You have voted! Please wait for other players to vote.</div>;
    }else{
        return (
            <div>
                <div className="Prompt-prompt">
                    <h1>{currentPrompt}</h1>
                </div>
                
                <div className="Prompt-prompt">
                    <h1>{currentResponse0}</h1>
                </div>
                
                <div className="Prompt-prompt">
                    <h1>{currentResponse1}</h1>
                </div>

                <button onClick = {handleVote0}>
                    Vote 0      
                </button>
                <button onClick = {handleVote1}>
                    Vote 1
                </button>
            </div>
            );
    }

};

export default Voting;
