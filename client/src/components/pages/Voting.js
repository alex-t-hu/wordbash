import React from "react";

import "./Landing.css";
import "../../utilities.css"
import { useState } from "react";

import { get, post } from "../../utilities";


const Voting = (props) => {

    const [voted, setVoted] = useState(false); // true if user has voted

    // called when the user hits "Submit" for a new post
    const handleVote0 = (event) => {
        event.preventDefault();
        post("/api/vote", {gameID: props.gameID, userId: props.userId, vote: 0}).then((g) => {
            console.log("Voted Successfully");
            setVoted(true);
            });
    };
    const handleVote1 = (event) => {
        event.preventDefault();
        post("/api/vote", {gameID: props.gameID, userId: props.userId, vote: 1}).then((g) => {
            console.log("Voted Successfully");
            setVoted(true);
            });
    };
    if (!props.userId) {
        return <div>Please Log in</div>;
    }
    if(voted){
        return <div>You have voted</div>;
    }else{
        return (
            <div className>
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
