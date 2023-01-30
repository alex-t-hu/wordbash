import React, { useState, useEffect } from "react";
import SingleMessage from "./SingleMessage.js";
import { NewMessage } from "./NewPostInput.js";

import "./Chat.css";

/**
 * @typedef UserObject
 * @property {string} _id
 * @property {string} name
 */
/**
 * @typedef MessageObject
 * @property {UserObject} sender
 * @property {string} content
 */
/**
 * @typedef ChatData
 * @property {MessageObject[]} messages
 * @property {UserObject} recipient
 */

/**
 * Renders main chat window including previous messages,
 * who is being chatted with, and the new message input.
 *
 * Proptypes
 * @param {ChatData} data
 */
const Chat = (props) => {
  if (!props.gameID) {
    return(
      <div className="u-flexColumn Chat-container">
        <div className="Chat-historyContainer">
          <h3>Loading Messages...</h3>
        </div>
        <div className="">
          <h3>Loading Messages...</h3>
        </div>
      </div>);
  }
  if (!props.messages) {
    return(
    <div className="u-flexColumn Chat-container">
      <div className="Chat-historyContainer">
        <h3>Chatting with {props.gameID}</h3>
      </div>
      <div className="">
        <NewMessage recipient={props.gameID} />
      </div>
    </div>);
  }

  return (
    <div className="u-flexColumn Chat-container">
      {/* <h3>Chatting with {props.data.recipient.name}</h3> */}
      <div className="Chat-historyContainer">
        {props.messages.map((m, i) => (
          <SingleMessage message={m} key={i} />
        ))}
      </div>
      <div className="">
        <NewMessage recipient={props.gameID} />
      </div>
    </div>
  );
}

export default Chat;
