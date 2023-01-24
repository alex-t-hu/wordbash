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
    <>
      {Object.keys(props.users)
        .map((key, i) => (
          <SingleUser
            key={i}
            // setActiveUser={props.setActiveUser}
            user={props.users[key].id}
            // active={user === props.active}
          />
        ))}
    </>
  );
}

export default UserList;
