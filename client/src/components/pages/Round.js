import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import Prompt from "./Prompt.js";
import Voting from "./Voting.js";
import SidebarUserList from "../modules/SidebarUserList/SidebarUserList.js";


import "../../utilities.css";


/**
 * Define the "App" component
 */
const Round = (props) => {
  // console.log("GAMEEE",props.userId);
  // console.log(props.gameID);
  const [finishedDisplaying, setFinishedDisplaying] = useState(false);
  useEffect( () => {
    const timeOut = setTimeout(() => {
        setFinishedDisplaying(true);
        navigate(`/${props.gameID}/prompt`);
    }, 2000);
    return ()=> {
      clearTimeout(timeOut);
    };
  },[finishedDisplaying]);
  return (
      <div className="animate-bounce h-screen bg-gray-50">Round {props.currentRound}</div> 
  );
};
export default Round;
