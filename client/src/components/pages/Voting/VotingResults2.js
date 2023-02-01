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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prompt, currentPrompt] = useState(props.prompt)



    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentIndex(currentIndex + 1);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [currentIndex]);
    if (!props.userId) {
        return <div>Please Log in</div>;
    }
    if (!props.prompt || !prompt) {
        return <div>Prompt information not found</div>;
    }


    return (
        <div className="flex flex-col h-full w-full justify-between">
            <div className="flex justify-center text-5xl text-center">
                <PromptQuestion message={prompt["content"]} dir={"none"}/>
            </div>

            <div className="flex flex-row w-full">
                <div className="w-[50%] p-[5%] flex flex-row w-full align-items justify-between">
                    <div className ="w-[30%] aspect-auto flex flex-col h-full align-items justify-around">
                        <img src = {prompt['response_0_avatar']} />
                        <div className="bg-amber-300 rounded-2xl p-1 flex flex-row w-full align-items justify-around">
                        <h1 className="text-center text-4xl">{prompt['response_0_person_name']}</h1>
                        </div>
                    </div>
                    <div className = "w-[60%]" >
                        <PromptResponse hoverable={false} message={prompt['response_0_answer']} author={prompt['response_0_person_name']} dir="left"/>
                    </div>
                    
                </div>
                <div className="w-[50%] p-[5%] flex flex-row w-full align-items justify-between">
                    <div className = "w-[60%]" >
                        <PromptResponse className = "w-[80%]" hoverable={false} message={prompt['response_1_answer']} author={prompt['response_1_person_name']} dir="right"/>
                    </div>


                    <div className ="w-[30%] aspect-auto flex flex-col h-full align-items justify-around">
                        <img src = {prompt['response_1_avatar']} />
                        <div className="bg-amber-300 rounded-2xl p-1 flex flex-row w-full align-items justify-around">
                        <h1 className="text-center text-4xl">{prompt['response_1_person_name']}</h1>
                        </div>

                        </div>
                </div>


            </div>

            <div className="flex flex-row w-full">
                <div className="w-[50%] p-[5%] flex flex-col align-items justify-between">
                        {prompt["response_0_vote_names"].map((player) => {    
                            return (<div className="bg-amber-300 m-4 rounded-2xl p-1 flex flex-row w-full align-items justify-start">
                                        
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[15%] aspect-auto">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                        <div className="flex items-center m-4">

                            <TypeAnimation
                                sequence={(player)}
                                wrapper="div"
                                cursor={false}
                                repeat={0}
                                className="text-center text-3xl"
                                speed = "10"
                            />
                        </div>
                    
                    </div>  );
                        })} 
                    
                </div>


                <div className="w-[50%] p-[5%] flex flex-col align-items justify-between">
                        {prompt["response_1_vote_names"].map((player) => {
                            return (
                                <div className="bg-amber-300 rounded-2xl m-4 p-1 flex flex-row w-full align-items justify-start">
                                        
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[15%] aspect-auto">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    
                                    <div className="flex items-center m-4">
                                        <TypeAnimation
                                            sequence={(player)}
                                            wrapper="div"
                                            cursor={false}
                                            repeat={0}
                                            className="text-center text-3xl"
                                            speed = "10"
                                        />
                                    </div>
                            
                                </div> );
                        })} 

                </div>


            </div>



            
            <div className="flex-grow"></div>

            {props.isHost ?
                (
                <div className="flex flex-col space-y-2 w-full mt-4">
                    
                    <button className={ `w-full bg-white hover:bg-gray-100 text-3xl text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition ease-in-out delay-50 hover:scale-[1.05] hover:scale-130 duration-300`}
                    // TOOD: add a check to make sure there are at least 3 players
                    onClick = {props.handleDoneVoting}>
                    Continue!
                    </button>
                </div>
                ) : (
                    
                <div className="flex flex-col space-y-2 w-full mt-4">
                    
                <button className={`w-full bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:cursor-not-allowed opacity-50`}
                        disabled={true}>
                            Waiting for host to continue...
                </button>

                </div>
                )
                }
        </div>
    );

};

export default VotingResults2;
