import React, { useState, useEffect } from "react";

import "./ChatSingleUser.css";

/**
 * Component to render an online user
 *
 * Proptypes
 * @param {(UserObject) => ()} setActiveUser function that takes in user,
 *  sets it to active
 * @param {UserObject} user
 * @param {boolean} active
 */
const ChatSingleUser = (props) => {
  return (
    <div
      className={`ChatSingleUser-container u-pointer ${props.active ?
        "ChatSingleUser-container--active" : ""
        }`}
      onClick={() => {
        props.setActiveUser(props.user);
      }}
    >
      {props.user.name}
    </div>
  );
}

export default ChatSingleUser;
