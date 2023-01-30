import React, { useEffect, useState } from "react";
import ChatList from "../modules/chat/ChatList.js";
import Chat from "../modules/chat/Chat.js";

import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Chatbook.css";

// const ALL_CHAT = {
//   _id: "ALL_CHAT",
//   name: "The Multiverse",
// };



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

  // const [activeUsers, setActiveUsers] = useState([]);

  // const [GAME_CHAT, setGameChat] = useState(null);

  
  const [messages, setMessages] = useState([]);

  // const [gameID, setGameID] = useState(null);



  const loadMessageHistory = () => {
    if(props.gameID){
      get("/api/chat", { recipient_id: props.gameID }).then((messages) => {
        console.log("loadMessages" + props.gameID);
        setMessages(messages); 
        // setActiveChat({
        //   recipient: recipient,
        //   messages: messages,
        // });
      });
    }
    
  };

  // useEffect(() => {
  //   if(props.gameID){
  //     setGameID(props.gameID);
  //   }
  // }, [props.gameID]);

  useEffect(() => {
    document.title = "Chatbook";
  }, []);

  // Update Game Chat when game is created
  useEffect(() => {
    console.log("New gameID Detected:", props.gameID);
    if(props.gameID){
      loadMessageHistory();
      // console.log("new Chat Detected: gameID", props.gameID);
      // setGameChat({
      //   _id: "GAME###" + props.gameID,
      //   name: "Universe " + props.gameID,
      // });
    }
  }, [props.gameID]);


  // useEffect(() => {
  //   console.log("I'm loading the message history because the active User just changed.")
  //   loadMessageHistory(activeChat.recipient);
  // }, [activeChat.recipient._id]);


  
  // useEffect(() => {
  //   get("/api/activeUsers").then((data) => {
  //     // If user is logged in, we load their chats. If they are not logged in,
  //     // there's nothing to load. (Also prevents data races with socket event)
  //     if (props.userId) {
  //       if(GAME_CHAT === null){
  //         console.log("GAME_CHAT is null");
  //         setActiveUsers([ALL_CHAT].concat(data.activeUsers));
  //       } else {
  //         console.log("GAME_CHAT is not null");
  //         setActiveUsers([ALL_CHAT, GAME_CHAT].concat(data.activeUsers));
  //       }

  //     };
  //     console.log("activeUsers" + data);
  //   });
  // }, [GAME_CHAT]);

  useEffect(() => {
    const addMessages = (data) => {
      console.log("addMessages");
      console.log(data);

      // console.log(
      //   "Recipient id is " + data.recipient._id + " and sender id is " + data.sender._id + "user id is " + props.userId + "active chat recipient id is " + activeChat.recipient._id
      // )

      // I'm pretty sure GAME_CHAT will work for this.

      // Figure out if the message is for the active chat
      // If {recipient, sender} maches {activeChat, userId} or vice versa
      // let listen = (data.recipient._id === activeChat.recipient._id && data.sender._id === props.userId) ||
      //               (data.sender._id === activeChat.recipient._id && data.recipient._id === props.userId);

      // // If the message is for all chat, and the active chat is all chat
      // if(data.recipient._id === "ALL_CHAT" && activeChat.recipient._id === "ALL_CHAT") listen = true;

      // If the message is for game chat
      if(props.gameID === null){
        console.log("props.gameID is null");
      } else {
        if(data.recipient === props.gameID){

          console.log("Messages was set because of socket to" + data.recipient)
          setMessages(prev => (prev.concat(data)));

        }else{
          console.log("Messages was not set because of socket to" + data.recipient + " and props.gameID is " + props.gameID)
        }
      }

    };
    socket.on("message", addMessages);
    return () => {
      socket.off("message", addMessages);
    };
  }, []);

  // useEffect(() => {
  //   const callback = (data) => {
  //     if(GAME_CHAT === null){
  //       setActiveUsers([ALL_CHAT].concat(data.activeUsers));
  //     } else {
  //       setActiveUsers([ALL_CHAT, GAME_CHAT].concat(data.activeUsers));
  //     }
  //   };
  //   socket.on("activeUsers", callback);
  //   return () => {
  //     socket.off("activeUsers", callback);
  //   };
  // }, []);

  // useEffect(() => {
  //   if(GAME_CHAT != null){
  //     console.log("GAME_CHAT IS" + GAME_CHAT._id);
  //     console.log("GAME_CHAT HAS" + GAME_CHAT.name);
  //   }
  //   else{
  //     console.log("GAME_CHAT IS NULL");
  //   }
  // }, [GAME_CHAT]);


  useEffect(() => {
    console.log("messages" + messages);
    for(let i = 0; i < messages.length; i++){
      console.log(messages[i]);
    }
  }, [messages]);

  // useEffect(() => {
  //   console.log("activeUsers" + activeUsers);
  // }, [activeUsers]);
  
  // // const setActiveUser = (user) => {
  // //   if (user._id !== activeChat.recipient._id) {
  // //     console.log("activeChat was set because of setActiveUser " + user._id)
  // //     setActiveChat({
  // //       recipient: user,
  // //       messages: [],
  // //     });
  // //   }
  // // };

  

  if (!props.userId) {
    return <div>Log in before using Chatbook</div>;
  }
  return (
    <div className="h-full flex flex-row bg-gray-50 bg-opacity-50 rounded-3xl">
      {/* <div className="Chatbook-userList">
        <ChatList
          setActiveUser={setActiveUser}
          userId={props.userId}
          users={activeUsers}
          active={activeChat.recipient}
        />
      </div> */}
      <Chat messages={messages} gameID = {props.gameID}/>
    </div>
  );
}

export default Chatbook;
