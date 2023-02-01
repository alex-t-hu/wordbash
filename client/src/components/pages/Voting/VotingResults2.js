import React, { useEffect } from "react";

import "../Landing.css";
import "../../../utilities.css";
import { useState } from "react";
import SortedPlayerList from "../../modules/SortedPlayerList.js";
import "./VotingResults.css";
import { TypeAnimation } from 'react-type-animation';
import PromptResponse from "../../modules/PromptResponse.js";
import PromptQuestion from "../../modules/PromptQuestion.js";

const VotingResults2 = (props) => {
    const [hasFinishedPrompt0, setHasFinishedPrompt0] = useState(false);
    const [hasFinishedPrompt1, setHasFinishedPrompt1] = useState(false);
    const [hasFinishedName0, setHasFinishedName0] = useState(false);
    const [hasFinishedName1, setHasFinishedName1] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prompt, currentPrompt] = useState(props.prompt)
    // players = {props.game.players}
    // promptText = {currentPrompt}
    // currentResponse0 = {currentResponse0}
    // playersWhoVoted0 = {props.game["prompts"][props.game.votingRound]["response_0_vote"]}
    // currentResponse1 = {currentResponse1}
    // playersWhoVoted1 = {props.game["prompts"][props.game.votingRound]["response_1_vote"]}
    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentIndex(currentIndex + 1);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [currentIndex]);
    if (!props.userId) {
        return <div>Please Log in</div>;
    }
    if (!props.prompt) {
        return <div>Prompt information not found</div>;
    }
    return (
        <div className="flex flex-col h-full w-full justify-between">
            <div className="flex justify-center text-7xl text-center py-10 px-20">
                <PromptQuestion message={prompt["content"]} dir={"none"}/>
            </div>

            <div className="flex flex-row w-full">
                <div className="w-[50%] p-[5%]">
                    <PromptResponse hoverable={false} message={prompt['response_0_answer']} author={prompt['response_0_person_name']} dir="left"/>
                    {prompt["response_0_vote_names"].map((player) => {
                        return (<TypeAnimation
                            sequence={(player + " hi")}
                            wrapper="div"
                            cursor={false}
                            repeat={0}
                            style={{ fontSize: '1.2em' }}
                            className="text-center"
                        /> );
                    })} 
                </div>
                <div className="w-[50%] p-[5%]">
                    <PromptResponse hoverable={false} message={prompt['response_1_answer']} author={prompt['response_1_person_name']} dir="right"/>
                    {prompt["response_1_vote_names"].map((player) => {
                        return (<TypeAnimation
                            sequence={player}
                            wrapper="div"
                            cursor={false}
                            repeat={0}
                            style={{ fontSize: '1.2em' }}
                            className="text-center"
                        /> );
                    })}  
                </div>
            </div>
            
            <div className="flex-grow"></div>
            <div className="w-full flex justify-center my-[40px]">
                <button className="w-[50%] bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition ease-in-out delay-50 hover:scale-[1.05] hover:scale-130 duration-300"
                        onClick = {props.handleDoneVoting}>
                    Continue to next round!
                </button>               
            </div>
        </div>
    );
    

};

export default VotingResults2;
