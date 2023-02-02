import React, { useState, useEffect } from "react";
import SingleFinalUser from "./SingleFinalUser.js";

import "./SingleFinalUser.css";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {UserObject[]} users to display
 * @param {string} userId id of current logged in user
 */
const FinalUserList = (props) => {
  // const [userState, setUserState] = useState({});

  // useEffect(() => {
  //   setUserState(props.users);
  //   // console.log"userState", props.users);
  // }, [props.users]);
  const [playerList, setPlayerList] = useState([]);
    // const getName = (id) => {
    //     let name;
    //     get("/api/user", {userid: id}).then((userObj) => {name=userObj.name});
    //     return name;
    // };
    useEffect(() => {
        
        // console.log"Players ", props.users);
        if (props.users && playerList.length===0) {
            let sortedPlayers = Object.keys(props.users).map((key) => {
                return [key, props.users[key]];
            });
            sortedPlayers.sort((a, b) => {return b[1]['score']-a[1]['score']});
            setPlayerList(sortedPlayers);
            // console.logsortedPlayers);
        }
        
    }, [props.users]); // see game-logic.js for the structure of game

    

  if(Object.keys(playerList).length > 0){
    return (
      <div className="w-full flex flex-col text-center bg-gray-50">
        <div className="w-full bg-gray-100 rounded-t-xl py-2 text-9xl font-bold">
          <h1>Final Results</h1>
        </div>
        <div className="p-2 flex-grow break-words">
          {Object.keys(playerList)
            .map((key, i) => (
              <SingleFinalUser
                index={i}
                // setActiveUser={props.setActiveUser}
                user={playerList[key][1].name}
                avatar={playerList[key][1].avatar}
                score={playerList[key][1].score}
                // active={user === props.active}
              />
            ))}
        </div>
        

      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col text-center bg-gray-50">
        <h1> Not found</h1>
      </div>
    );
  }

}

export default FinalUserList;
