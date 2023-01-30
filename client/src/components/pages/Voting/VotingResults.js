import React, { useEffect } from "react";

import "../Landing.css";
import "../../../utilities.css";
import { useState } from "react";
import SortedPlayerList from "../../modules/SortedPlayerList";
import "./VotingResults.css";
import { TypeAnimation } from 'react-type-animation';
import ReactCSSTransitionGroup from 'react-transition-group';
const VotingResults = (props) => {
    const [hasFinished, setHasFinished] = useState(false);
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
            <div className="votingResults-prompt">{props.prompt.content}</div>
            <div className="votingResults-responsesContainer">
                <div className="votingResults-responseContainer">
                    <div className="votingResults-animatingResponseContainer">
                    <TypeAnimation
                        sequence={[
                            'Response 0: '.concat(props.currentResponse0).concat('\n').concat(props.prompt['response_0_person_name']), // Types 'One'
                            () => {
                                console.log('Done typing!'); // Place optional callbacks anywhere in the array
                                setHasFinished(true);
                            }
                        ]}
                        wrapper="div"
                        cursor={false}
                        repeat={0}
                        style={{ fontSize: '1.2em' }}
                    />
                    </div>
                    {/* <TypeAnimation
                        sequence={[
                            'Response 0: '.concat(props.currentResponse0), // Types 'One'
                            () => {
                            console.log('Done typing!'); // Place optional callbacks anywhere in the array
                            }
                        ]}
                        wrapper="div"
                        cursor={false}
                        repeat={0}
                        style={{ fontSize: '1.2em' }}
                    /> */}
                    {/* <div className="votingResults-responseText">Response 0: {props.currentResponse0}</div> */}
                    {hasFinished &&
                        props.prompt["response_0_vote_names"].map((player) => {
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
                                'Response 1: '.concat(props.currentResponse1).concat('\n').concat(props.prompt['response_1_person_name']), // Types 'One'
                                () => {
                                console.log('Done typing!') // Place optional callbacks anywhere in the array
                                    setHasFinished(true);
                                }
                            ]}
                            wrapper="div"
                            cursor={false}
                            repeat={0}
                            style={{ fontSize: '1.2em' }}
                    />
                    </div>
                    {/* <div className="votingResults-responseText">Response 1: {props.currentResponse1}</div> */}
                    {
                        hasFinished &&
                        props.prompt["response_1_vote_names"].map((player) => {
                                return <div>{player}</div>;
                            
                            
                        })
                    }
                </div> 
            </div>
            <button className="votingResults-button"
            onClick = {props.handleDoneVoting}>
                Continue to next round!
            </button>
        </div>
    );
    

};

export default VotingResults;
