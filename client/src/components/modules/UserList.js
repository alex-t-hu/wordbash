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
    <div className="w-full flex flex-col text-center bg-gray-50">
      {Object.keys(props.users)
        .map((key, i) => (
          <SingleUser
            index={i}
            // setActiveUser={props.setActiveUser}
            user={props.users[key].name}
            // active={user === props.active}
          />
        ))}
    </div>
  );
}

export default UserList;
