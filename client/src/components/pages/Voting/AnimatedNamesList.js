import React, { useEffect } from "react";

import "../Landing.css";
import "../../../utilities.css";
import { useState } from "react";
import SortedPlayerList from "../../modules/SortedPlayerList";
import "./VotingResults.css";
import { TypeAnimation } from 'react-type-animation';
import {CSSTransitionGroup} from 'react-transition-group';
const AnimatedNamesList = (props) => {
    const [promptNames, setPromptNames] = useState(props.promptNames);
    // players = {props.game.players}
    // promptText = {currentPrompt}
    // currentResponse0 = {currentResponse0}
    // playersWhoVoted0 = {props.game["prompts"][props.game.votingRound]["response_0_vote"]}
    // currentResponse1 = {currentResponse1}
    // playersWhoVoted1 = {props.game["prompts"][props.game.votingRound]["response_1_vote"]}
    if (!props.userId) {
        return <div>Please Log in</div>;
    }
    if (!props.prompt) {
        return <div>Prompt information not found</div>;
    }
    return (
        <div>
            {
                promptNames.map((player) => {
                        // setTimeout(() => {
                        //     // console.log"Hello");
                        // }, 1000).then( ()=> {
                        //     return <div>{player}</div>;
                        // })
                        return <div>{player}</div>; 
                })
            }
        </div>
    );
    

};

export default AnimatedNamesList;
