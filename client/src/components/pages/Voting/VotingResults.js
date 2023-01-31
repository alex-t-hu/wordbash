import React, { useEffect } from "react";

import "../Landing.css";
import "../../../utilities.css";
import { useState } from "react";
import SortedPlayerList from "../../modules/SortedPlayerList";
import "./VotingResults.css";
import { TypeAnimation } from 'react-type-animation';

const VotingResults = (props) => {
    const [hasFinishedPrompt0, setHasFinishedPrompt0] = useState(false);
    const [hasFinishedPrompt1, setHasFinishedPrompt1] = useState(false);
    const [hasFinishedName0, setHasFinishedName0] = useState(false);
    const [hasFinishedName1, setHasFinishedName1] = useState(false);
    const [currentPrompt, setCurrentPrompt] = useState(props.prompt);
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
        <div className="votingResults-container">
            <div className="votingResults-prompt">{currentPrompt.content}</div>
            <div className="votingResults-responsesContainer">
                <div className="votingResults-responseContainer">
                    <div className="votingResults-animatingResponseContainer">
                        <TypeAnimation
                            sequence={[
                                currentPrompt['response_0_answer'],// Types 'One'
                                () => {
                                    console.log('Done typing!'); // Place optional callbacks anywhere in the array
                                    setHasFinishedPrompt0(true);
                                }
                            ]}
                            wrapper="div"
                            cursor={false}
                            repeat={0}
                            style={{ fontSize: '1.2em' }}
                        />
                    </div>
                    { hasFinishedPrompt0 && hasFinishedPrompt1 && 
                    <div className="votingResults-animatingPlayerNameContainer">
                        <TypeAnimation
                        sequence={[
                            currentPrompt['response_0_person_name'],
                            () => {
                                console.log('Done typing!'); // Place optional callbacks anywhere in the array
                                setHasFinishedName0(true);
                            }
                        ]}
                        wrapper="div"
                        cursor={false}
                        repeat={0}
                        style={{ fontSize: '1.2em' }}
                        />
                    </div>
                    }                    
                    {hasFinishedPrompt0 && hasFinishedPrompt1 && hasFinishedName0 && hasFinishedName1 &&
                        currentPrompt["response_0_vote_names"].map((player) => {
                                // setTimeout(() => {
                                //     console.log("Hello");
                                // }, 1000).then( ()=> {
                                //     return <div>{player}</div>;
                                // })
                               return <div>{player}</div>; 
                        })
                    }
                </div>
                <div className="votingResults-responseContainer">
                    <div className="votingResults-animatingResponseContainer">
                    <TypeAnimation
                            sequence={[
                                currentPrompt['response_1_answer'], // Types 'One'
                                () => {
                                console.log('Done typing!') // Place optional callbacks anywhere in the array
                                    setHasFinishedPrompt1(true);
                                }
                            ]}
                            wrapper="div"
                            cursor={false}
                            repeat={0}
                            style={{ fontSize: '1.2em' }}
                    />
                    </div>
                    { hasFinishedPrompt0 && hasFinishedPrompt1 && 
                    <div className="votingResults-animatingPlayerNameContainer">
                        <TypeAnimation
                        sequence={[
                            currentPrompt['response_1_person_name'],
                            () => {
                                console.log('Done typing!'); // Place optional callbacks anywhere in the array
                                setHasFinishedName1(true);
                            }
                        ]}
                        wrapper="div"
                        cursor={false}
                        repeat={0}
                        style={{ fontSize: '1.2em' }}
                        />
                    </div>
                    } 
                    {
                        hasFinishedPrompt0 && hasFinishedPrompt1 && hasFinishedName0 && hasFinishedName1 &&
                        currentPrompt["response_1_vote_names"].map((player) => {
                                return <div>{player}</div>;
                        })
                    }
                </div> 
            </div>
            <button className="votingResults-button flex justify-center"
                    onClick = {props.handleDoneVoting}>
                Continue to next round!
            </button>
        </div>
    );
    

};

export default VotingResults;
