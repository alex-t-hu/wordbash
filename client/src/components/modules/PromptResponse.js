import React, { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';

import "../../utilities.css";

const PromptResponse = (props) => {
  let bgColor = "white";



  return (
    <button onClick = {props.handleVote} className={`w-full ${props.hoverable && "hover:cursor-auto"}`}>
      <div className={`${props.selected ? "bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400" : "bg-white"} flex w-full rounded-xl justify-center transition ease-in-out delay-50 ${props.hoverable && "hover:cursor hover:scale-[1.04] hover:scale-130"} duration-300`}>
        <div class={`w-full flex-1 text-black p-2 px-6 rounded-xl mb-2 relative text-[2rem] break-words text-center`}>
            {/* <TypeAnimation
                sequence={[
                  props.message,// Types 'One'
                    () => {
                        console.log('Done typing!'); // Place optional callbacks anywhere in the array
                        setHasFinishedPrompt0(true);
                    }
                ]}
                wrapper="div"
                cursor={false}
                repeat={0}
                speed="80"
                style={{ fontSize: '1.2em' }}
            /> */}
            {props.message}
            {props.dir!=="none" && 
            <div className={`${props.selected ? "bg-blue-400" : "bg-white"} absolute ${props.dir==="left" ? "left" : "right"}-0 top-1/2 transform ${props.dir==="left" ? "-translate-x-1/2" : "translate-x-1/2"} rotate-45 w-3 h-3`}></div>}
        </div>
      </div>
    </button>
  );
}

export default PromptResponse;
