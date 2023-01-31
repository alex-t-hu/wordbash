import React, { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';

import "../../utilities.css";

const PromptResponse = (props) => {
  let bgColor = "white";
  return (
    <div class="flex w-full justify-center mb-4 w-[60%]">
      <div class={`flex-1 bg-${bgColor} text-black p-2 px-6 rounded-lg mb-2 relative text-[2rem]`}>
          <TypeAnimation
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
          />
          {props.dir!=="none" && 
          <div class={`absolute ${props.dir==="left" ? "left" : "right"}-0 top-1/2 transform ${props.dir==="left" ? "-translate-x-1/2" : "translate-x-1/2"} rotate-45 w-3 h-3 bg-${bgColor}`}></div>}
      </div>
    </div>
  );
}

export default PromptResponse;
