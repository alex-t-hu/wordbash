import React, { useState, useEffect } from "react";
import SingleUser from "./SingleUser.js";

import "./SingleUser.css";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {UserObject[]} users to display
 * @param {string} userId id of current logged in user
 */
const UserList = (props) => {
  return (
    <div className="h-full w-full flex flex-col text-center bg-gray-50">
      {Object.keys(props.users)
        .map((key, i) => (
          <SingleUser
            userId={props.users[key].id}
            index={i}
            // setActiveUser={props.setActiveUser}
            isYou={props.users[key].id===props.userId}
            user={props.users[key].name}
            avatar={props.users[key].avatar}
            returned = {props.returned.includes(props.users[key].id)}
            modifiable= {props.modifiable}
            // active={user === props.active}
          />
        ))}
    </div>
  );
}

export default UserList;
