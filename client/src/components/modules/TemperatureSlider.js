import React, { useState, useEffect } from "react";


const TemperatureSlider = (props) => {


    const [mouseOverTemperature, setMouseOverTemperature] = useState(false);


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
            props.setTemperature(event.target.value);
        }
    };

    // I'm not sure if this is the best way to do this, but it works
    const onMouseEnter = (event) => {
        setMouseOverTemperature(true);
    };
    
    const onMouseLeave = (event) => {
        setMouseOverTemperature(false);
    };

    return (
        <div>
        <div className="bg-gray-200 p-4 flex flex-col items-center ml-2 rounded-md">

        <h1 className="">Temperature:</h1>

        <input 
        className={`slider`}
        id="myRange"
        onChange={onChange}
        onMouseEnter = {onMouseEnter}
        onMouseLeave = {onMouseLeave}
        // onMouseUp={onMouseUp} // only if such effect is desired

        type="range" min="5" max="20" value={props.temperature}/>
        <h1 className="">{temperatureOptions[props.temperature]}</h1>
        
        </div>
        {mouseOverTemperature && <div>
            The temperature of the game determines how much randomness the language model will use.
            Much like LSD, increasing the temperature will increase the model's creativity, but also its incoherence.
        </div>}
        </div>
    );
}

export default TemperatureSlider;