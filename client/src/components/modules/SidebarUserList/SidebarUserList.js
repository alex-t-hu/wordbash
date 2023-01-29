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


  if(props.users&& Object.keys(props.users).length > 0){

    
    return (
      <div className="w-full flex flex-col text-center bg-gray-50">
        {
            Object.keys(props.users)
              .map((key, i) => (
                <SingleScoreUser
                  index={i}
                  // setActiveUser={props.setActiveUser}
                  user={props.users[key].name}
                  score={props.users[key].score}
                  // active={user === props.active}
                />
              ))
          }
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