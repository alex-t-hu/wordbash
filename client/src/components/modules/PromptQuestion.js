import React, { useEffect, useState } from "react";

import "../../utilities.css";

const PromptQuestion = (props) => {

  return (
    <div class="flex w-full justify-center mb-4 w-[60%]">
      <div class="flex-1 bg-indigo-400 text-white p-2 px-6 rounded-lg mb-2 relative">
          <div>{props.message}</div>

          <div class="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
      </div>
    </div>
  );
}

export default PromptQuestion;
