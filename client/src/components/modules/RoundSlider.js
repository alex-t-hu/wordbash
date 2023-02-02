import React, { useState, useEffect } from "react";

/**
 * Takes in a number of players and handles to set the number of rounds.
 * @param {*} props 
 * @returns 
 */
const RoundSlider = (props) => {
    const [mouseOver, setMouseOver] = useState(false);

    // 45 seconds for one prompt,
    // 45 seconds for voting.
    // 20 seconds showing results (This is per prompt pair. Right?)
    // So for N players, one round requires 2 * 45 + 45 * N + 20 * N = 90 + 65 * N seconds.
    // We want games to last around 20 minutes.
    // Formula: 1200 / (90 + 65 * N) = R
    const recommendedRounds = [
        "",//"Find some friends!",
        "",//"Find some friends!",
        "",//"Find some friends!",
        "3 Players is enough to play! Suggested: 8 prompts.", // 1200 / (90 + 65 * 3) = 4
        "Suggested: 6 prompts.", // 1200 / (90 + 65 * 4) = 3
        "Suggested: 6 prompts.", // 1200 / (90 + 65 * 5) = 3 ish
        "Suggested: 4 prompts.", // 1200 / (90 + 65 * 6) = 2
        "Suggested: 4 prompts.", // 1200 / (90 + 65 * 7) = 2
        "Suggested: 4 prompts.", // 1200 / (90 + 65 * 8) = 2
        "That's a lot of players! Suggested: 4 prompts.", // 1200 / (90 + 65 * 9) = 2
        "That's a lot of players! Suggested: 4 prompts.", // 1200 / (90 + 65 * 10) = 2
    ]

    const onChange = (event) => {
        if(props.setNumRounds){
            props.setNumRounds(event.target.value);
        }
    };

    const onMouseEnter = (event) => {
        setMouseOver(true);
    };
    
    const onMouseLeave = (event) => {
        setMouseOver(false);
    };

    

    return (
        <div>
            <div 
                onMouseEnter = {onMouseEnter}
                onMouseLeave = {onMouseLeave}
                className="bg-gray-200 p-4 flex flex-row space-x-4 mx-2 rounded-md">
                    
                    <h1 className="w-[120px] text-right font-bold">Number of Prompts:</h1>

                    <div className="flex flex-col flex-grow text-center pt-1">
                        <input 
                        className={`slider`}
                        id="myRange"
                        onChange={onChange}
                        disabled={props.disabled}
                        // onMouseUp={onMouseUp} // only if such effect is desired
                        type="range" min="1" max="5"
                        value={props.disabled ? 1 : props.numRounds}
                        />
                        {!props.disabled && 
                        (<h1 className="">{props.numRounds * 2} prompts</h1>) }
                        {mouseOver && <h1 className="">{props.disabled ? "Only the host can change game settings." : recommendedRounds[props.numPlayers]}</h1>}
                    </div>
            </div>
        </div>
    );
}

export default RoundSlider;
