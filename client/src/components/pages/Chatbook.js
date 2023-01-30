import React, { useEffect, useState } from "react";
import ChatList from "../modules/chat/ChatList.js";
import Chat from "../modules/chat/Chat.js";

import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Chatbook.css";

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "The Multiverse",
};



/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Chatbook = (props) => {
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

  const [activeUsers, setActiveUsers] = useState([]);

  const [activeChat, setActiveChat] = useState({
    recipient: ALL_CHAT,
    messages: [],
  });

  const [GAME_CHAT, setGameChat] = useState(null);

  const loadMessageHistory = (recipient) => {
    get("/api/chat", { recipient_id: recipient._id }).then((messages) => {
      setActiveChat({
        recipient: recipient,
        messages: messages,
      });
    });
  };

  useEffect(() => {
    document.title = "Chatbook";
  }, []);

  // Update Game Chat when game is created
  useEffect(() => {
    console.log("gameID", props.gameID);
    if(props.gameID){
      console.log("new Chat Detected: gameID", props.gameID);
      setGameChat({
        _id: "GAME###" + props.gameID,
        name: "Universe " + props.gameID,
      });
    }
  }, [props.gameID, props.game]);


  useEffect(() => {
    loadMessageHistory(activeChat.recipient);
  }, [activeChat.recipient._id]);

  useEffect(() => {
    get("/api/activeUsers").then((data) => {
      // If user is logged in, we load their chats. If they are not logged in,
      // there's nothing to load. (Also prevents data races with socket event)
      if (props.userId) {
        if(GAME_CHAT === null){
          setActiveUsers([ALL_CHAT].concat(data.activeUsers));
        } else {
          setActiveUsers([ALL_CHAT, GAME_CHAT].concat(data.activeUsers));
        }

      };
    });
  }, [GAME_CHAT]);

  useEffect(() => {
    const addMessages = (data) => {
      // I'm pretty sure GAME_CHAT will work for this.

      // Figure out if the message is for the active chat
      // If {recipient, sender} maches {activeChat, userId} or vice versa
      let listen = (data.recipient._id === activeChat.recipient._id && data.sender._id === props.userId) ||
                    (data.sender._id === activeChat.recipient._id && data.recipient._id === props.userId);

      // If the message is for all chat, and the active chat is all chat
      if(data.recipient._id === "ALL_CHAT" && activeChat.recipient._id === "ALL_CHAT") listen = true;

      // If the message is for game chat, and the active chat is game chat
      if(GAME_CHAT !== null){
        if(data.recipient._id === GAME_CHAT._id && activeChat.recipient._id === GAME_CHAT._id) listen = true;
      }

      if (listen) {
        setActiveChat(prevActiveChat => ({
          recipient: prevActiveChat.recipient,
          messages: prevActiveChat.messages.concat(data),
        }));
      }
    };
    socket.on("message", addMessages);
    return () => {
      socket.off("message", addMessages);
    };
  }, [activeChat.recipient._id, props.userId, GAME_CHAT]);

  useEffect(() => {
    const callback = (data) => {
      if(GAME_CHAT === null){
        setActiveUsers([ALL_CHAT].concat(data.activeUsers));
      } else {
        setActiveUsers([ALL_CHAT, GAME_CHAT].concat(data.activeUsers));
      }
    };
    socket.on("activeUsers", callback);
    return () => {
      socket.off("activeUsers", callback);
    };
  }, []);

  const setActiveUser = (user) => {
    if (user._id !== activeChat.recipient._id) {
      setActiveChat({
        recipient: user,
        messages: [],
      });
    }
  };

  if (!props.userId) {
    return <div>Log in before using Chatbook</div>;
  }
  return (
    <>
      <div className="flex flex-row h-full Chatbook-container bg-red-50">
        <div className="Chatbook-userList">
          <ChatList
            setActiveUser={setActiveUser}
            userId={props.userId}
            users={activeUsers}
            active={activeChat.recipient}
          />
        </div>
        <div className="Chatbook-chatContainer w-full u-relative">
          <Chat data={activeChat} />
        </div>
      </div>
    </>
  );
}

export default Chatbook;
