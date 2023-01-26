import React, { useEffect } from "react";

import "./Landing.css";

import "./Prompt.css";
import "../../utilities.css";
import { useState } from "react";

import { get, post } from "../../utilities";
import VotingSelection from "./Voting/VotingSelection";
import VotingResults from "./Voting/VotingResults";
import {socket} from "../../client-socket.js";
import { navigate } from "@reach/router";

const Voting = (props) => {
    /**
     * For testing purposes, we allow all users to vote on all prompts.
     * In the future, we will only allow the user to vote on other users' prompts.
     */
    
    const [promptNumber, setPromptNumber] = useState(-1); // 0, 1, or 2 (done)
    const [voted, setVoted] = useState(false); // true if the user has voted on the CURRENT prompt
    const [allVoted, setAllVoted] = useState(false); // true if the user has voted on the CURRENT prompt


    /**
     * Here's the voting loop:
     * promptNumber = 0, voted = false, allVoted = false
     * Player votes
     * promptNumber = 0, voted = true, allVoted = false
     * All players vote
     * promptNumber = 0, voted = true, allVoted = true
     * 
     * New prompt
     * promptNumber = 1, voted = false, allVoted = false
     * ...
     * 
     * In other words, allVoted correspondes to game["votingResults"]
     */


    const [currentPrompt, setCurrentPrompt] = useState(""); // the current prompt, text.
    const [currentResponse0 , setCurrentResponse0] = useState(""); // Reponse 0
    const [currentResponse1 , setCurrentResponse1] = useState(""); // Reponse 1


  /**
   * This effect is run every time any state variable changes.
   */
  
    // useEffect(() => {
    //     if(props.userId && props.gameID){
    //     get("/api/game", {gameID: props.gameID}).then((data) => {
    //         // console.log("data", data);
    //         if (props.setGame) {
    //             props.setGame(data);
    //         };
    //     });
    //     }
    // });
    useEffect(() => {
        if(props.userId && props.gameID){
            console.log("blah voting");
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
                console.log("gah voting");
                if(props.userId && props.gameID){
    
                get("/api/game", {gameID: props.gameID}).then((data) => {
                  // console.log("data", data);
                  if (props.setGame) {
                    props.setGame(data);
                    console.log("blah", data['promptsFinished']);
              setAllFinishedAnswering(data['promptsFinished']);
                  };
                });
            }};
            socket.on("gameUpdate", callback);
            return () => {
                socket.off("gameUpdate", callback);
            };
            },[]);
    /**
     * Grab a new prompt
     */

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


    /**
     * Update promptNumber if the voting round has changed
     * This is the only place promptNumber is updated
     */
    
    useEffect(() => {
        if(props.game.votingRound !== promptNumber){
            setPromptNumber(props.game.votingRound);
            setVoted(false);
        }
    }, [props.game]);

    /**
     * Update allVoted if game["votingResults"] has changed
     */
    useEffect(() => {
        // console.log("Bobo");
        setAllVoted(props.game["votingResults"]);
    }, [props.game]);

    
    /**
     * Go to the Final results page if the voting round is over
     */

    useEffect(() => {
        if(props.game.votingFinished) {
            navigate(`/game/${props.gameID}/results`);
        }
    }, [props.game]);


    /**
     * Functions and JSX
     */

    const handleVote0 = (event) => {
        event.preventDefault();
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
        post("/api/submitVote", {
            gameID: props.gameID,
            promptID: promptNumber,
            response: 1,
        }).then(
            setVoted(true)
        );
    };
    
    const handleDoneVoting = (event) => {
        console.log("Hello");
        event.preventDefault();
        post("/api/doneVoting", {
                gameID: props.gameID,
            }
        ).then(() => {
            setVoted(false);
            setAllVoted(false);
        });
    };

    if (!props.userId) {
        return (<div>Please Log in</div>);
    }
    if(allVoted){
        return (<div>
            <VotingResults
                handleDoneVoting = {handleDoneVoting}
                continueToNextPrompt = {props.continueToNextVoting}
                prompt = {props.game["prompts"][promptNumber]}
                userId = {props.userId}
                />
            </div>);
    }
    if(voted){
        return (<div>You have voted! Please wait for other players to vote.</div>);
    }
    return (
        <div>
            <VotingSelection
                currentPrompt = {currentPrompt}
                currentResponse0 = {currentResponse0}
                currentResponse1 = {currentResponse1}
                handleVote0 = {handleVote0}
                handleVote1 = {handleVote1}
            />
        </div>
        );
    

};

export default Voting;