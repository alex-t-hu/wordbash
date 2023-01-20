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
const ChatList = (props) => {
  return (
    <>
      <h3>Open Chats</h3>
      {props.users
        .map((user, i) => (
          <SingleUser
            key={i}
            // setActiveUser={props.setActiveUser}
            user={user}
            // active={user === props.active}
          />
        ))}
    </>
  );
}

export default ChatList;
