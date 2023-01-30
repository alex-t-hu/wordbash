import React, { useState, useEffect, useRef } from "react";
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
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  }

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

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
    <div className="w-full flex flex-col p-2">
      <h3 className="text-black text-center font-bold mb-4">Welcome to Room {props.gameID}!</h3>
      <div className="flex-grow overflow-y-auto mb-4">
        {props.messages.map((m, i) => (
          <SingleMessage message={m} key={i} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full">
        <NewMessage recipient={props.gameID} />
      </div>
    </div>
  );
}

export default Chat;
