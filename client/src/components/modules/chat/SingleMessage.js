import React, { useState, useEffect } from "react";

import "./SingleMessage.css";

/**
 * Renders a single chat message
 *
 * Proptypes
 * @param {MessageObject} message
 */
const SingleMessage = (props) => {
  return (
    <div className={"flex flex-row SingleMessage-container text-black"}>
      <span className="SingleMessage-sender font-bold text-right top-0 pr-2">{props.message.sender.name + ":"}</span>
      <span className="SingleMessage-content">{props.message.content}</span>
    </div>
  );
}

export default SingleMessage;
