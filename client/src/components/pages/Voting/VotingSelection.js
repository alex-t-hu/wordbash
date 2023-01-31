import React, { useEffect } from "react";
import "../../../utilities.css";
import { useState } from "react";
import "../Prompt.css";
import OurTimer from "../../modules/OurTimer.js";
import PromptResponse from "../../modules/PromptResponse";
import PromptQuestion from "../../modules/PromptQuestion";

import Waiting from "../Waiting";

const VotingSelection = (props) => {

    // const [voted, setVoted] = useState(false); // true if the user has voted on the CURRENT prompt

    // useEffect(() => {
    //     setVoted(props.hasVoted)
    // }, [props.hasVoted])
    useEffect(() => {
        props.setVotingSelection(-1);
    },[]);
    return (
        <div className="flex flex-col h-full w-full justify-between">
            <div className="flex justify-center text-7xl text-center py-10 px-20">
                <PromptQuestion message={props.currentPrompt} dir={"none"}/>
            </div>

            <div className="flex flex-row w-full space-x-[20%] px-20">
                {props.currentResponse0 && 
                    <PromptResponse hoverable={true}
                                    selected={props.votingSelection===0}
                                    message={props.currentResponse0}
                                    dir="left"
                                    handleVote={props.handleVote0}
                    />
                }
                {props.currentResponse1 && 
                    <PromptResponse hoverable={true}
                                    selected={props.votingSelection===1}
                                    message={props.currentResponse1}
                                    dir="right"
                                    handleVote={props.handleVote1}
                    />
                }
            </div>
            {props.hasVoted &&  
            <div className="flex justify-center text-center py-10 px-20">
                <p>
                    <Waiting message={
                        "Please wait for other players to vote. If you would like, you can change your response!"
                    }></Waiting>
                </p>
            </div>}

            <div className="flex-grow"></div>

            { (props.currentPrompt === "" || (!props.prompt)) ? <div>Loading ...</div> : <OurTimer startTime = {props.prompt["votingStartTime"]} seconds={300} handleTimeout={props.handleVoteTimeout} />}
        </div>
    );
};

export default VotingSelection;
