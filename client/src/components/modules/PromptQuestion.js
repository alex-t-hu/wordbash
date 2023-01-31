import React, { useEffect, useState } from "react";

import "../../utilities.css";

const PromptQuestion = (props) => {
  return (
    <div class="flex w-full justify-center mb-4 w-[60%] text-center">
      <div className={`flex-1 bg-[#000000] text-white p-2 px-6 rounded-lg mb-2 relative text-[2rem]`}>
          <div>{props.message}</div>
          {props.dir!=="none" && 
          <div className={`absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-3 h-3 bg-[#000000]`}></div>}
      </div>
    </div>
  );
}

export default PromptQuestion;
