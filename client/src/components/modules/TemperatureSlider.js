import React, { useState, useEffect } from "react";

import { get, post } from "../../utilities";

const TemperatureSlider = (props) => {


    const [mouseOver, setMouseOver] = useState(false);
    const [value, setValue] = useState(5);
    
    const temperatureOptions = [
    "0", // 0
    "1", // 1
    "2", // 2
    "3", // 3
    "4", // 4
    "Un Interesting", // 5
    "Un Interesting", // 6
    "Ummm Interesting", // 7
    "Ummm Interesting", // 8
    "Usually Interesting", // 9
    "Usually Interesting", // 10
    "Unusually Interesting", // 11
    "Unusually Intriguing", // 12
    "Unputdownably Intriguing", // 13
    "Uproariously Intelligent", // 14
    "Uproariously Intelligent", // 15
    "Unusual Idiocy", // 16
    "Unusual Idiocy", // 17
    "Uproariously Idiotic", // 18
    "Usually Insane", // 19
    "Uber Insane" // 20
    ];
    

    const onChange = (event) => {
        if(props.setTemperature){
            let newtemp = event.target.value;
            props.setTemperature(newtemp);
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

                <h1 className="w-[120px] text-right font-bold">Temperature:</h1>

                <div className="flex flex-col flex-grow text-center pt-1">
                    <input 
                    className={`slider`}
                    id="myRange"
                    onChange={onChange}
                    disabled={props.disabled}
                    // onMouseUp={onMouseUp} // only if such effect is desired

                    type="range" min="5" max="20" 
                    value={props.disabled ? 5 : props.temperature}
                    />
                    <h1 className="">{!props.disabled && temperatureOptions[props.temperature]}</h1>
                    
                    {mouseOver && <h1>
                        {
                        props.disabled ? "Only the host can change game settings." : `The temperature of the game determines how much randomness the language model will use.
                        Increasing the temperature will increase the AI's creativity, but also its incoherence!
                        `}
                    </h1>}
                </div>
            </div>
        </div>
    );
}

export default TemperatureSlider;
