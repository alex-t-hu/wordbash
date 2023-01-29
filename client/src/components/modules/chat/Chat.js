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
  return (
    <div className="u-flexColumn">
      <h3 className="text-center">Game Lobby</h3>
      <div className="overflow-y-auto border-collapse overflow-x-hidden flex flex-col">
        {props.data.messages.map((m, i) => (
          <SingleMessage message={m} key={i} />
        ))}
      </div>
      <div className="">
        <NewMessage recipient={props.data.recipient} />
      </div>
    </div>
  );
}

export default Chat;
