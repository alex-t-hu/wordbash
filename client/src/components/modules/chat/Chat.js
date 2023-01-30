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
  }, [props.data]);

  return (
    <div className="flex flex-col p-2">
      {/* <h3>Chatting with {props.data.recipient.name}</h3> */}
      <div className="overflow-y-auto mb-4">
        {props.data.messages.map((m, i) => (
          <SingleMessage message={m} key={i} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="">
        <NewMessage recipient={props.data.recipient} />
      </div>
    </div>
  );
}

export default Chat;
