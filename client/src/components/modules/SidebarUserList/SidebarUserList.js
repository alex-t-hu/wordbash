import React, { useState, useEffect } from "react";
import SingleScoreUser from "./SingleScoreUser.js";

import "./SingleScoreUser.css";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {UserObject[]} users to display
 * @param {string} userId id of current logged in user
 */
const SidebarUserList = (props) => {
  // const [userState, setUserState] = useState({});

  // useEffect(() => {
  //   setUserState(props.users);
  //   console.log("userState", props.users);
  // }, [props.users]);
  const [playerList, setPlayerList] = useState([]);

  const [allZero, setAllZero] = useState(true);
    // const getName = (id) => {
    //     let name;
    //     get("/api/user", {userid: id}).then((userObj) => {name=userObj.name});
    //     return name;
    // };
    useEffect(() => {
        
        console.log("Players ", props.users);
        if (props.users) {
            let sortedPlayers = Object.keys(props.users).map((key) => {
                return [key, props.users[key]];
            });
            sortedPlayers.sort((a, b) => {return b[1]['score']-a[1]['score']});
            setPlayerList(sortedPlayers);
            console.log(sortedPlayers);

            setAllZero(true);
            sortedPlayers.forEach((player) => {
                if (player[1]['scoreIncrease'] !== 0) {
                    setAllZero(false);
                }
            });
            console.log("allZero", allZero);
        }
        
    }, [props.users]); // see game-logic.js for the structure of game

    

  if(Object.keys(playerList).length > 0){
    return (
      <div className="w-full h-full flex flex-col text-center bg-opacity-30 bg-gray-50 rounded-xl">
        <div className="w-full bg-gray-100 rounded-t-xl py-2">
          <h1>Leaderboard</h1>
        </div>
        <div className="p-2 flex-grow">
          {Object.keys(playerList)
            .map((key, i) => (
              <SingleScoreUser
                index={i}
                // setActiveUser={props.setActiveUser}
                user={playerList[key][1].name}
                avatar={playerList[key][1].avatar}
                score={playerList[key][1].score}
                scoreIncrease = {playerList[key][1].scoreIncrease}
                allZero = {allZero}
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

export default SidebarUserList;
