import React, { useEffect, useState } from "react";
import UserList from "../modules/UserList.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Lobby.css";

// const ALL_CHAT = {
//   _id: "ALL_CHAT",
//   name: "ALL CHAT",
// };

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Lobby = (props) => {
  /**
   * @typedef UserObject
   * @property {string} _id
   * @property {string} name
   */

  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    document.title = "Lobby";
  }, []);

  useEffect(() => {
    get("/api/activeUsers").then((data) => {
      if (props.userId) {
        setActiveUsers(data.activeUsers);
      };
    });
  }, []);

  useEffect(() => {
    const callback = (data) => {
      
      // console.log("activeUsers", activeUsers);
      setActiveUsers(data.activeUsers);
      // console.log("activeUsers", data.activeUsers);
      
      // console.log("activeUsers", activeUsers);
    };

    socket.on("activeUsers", callback);
    return () => {
      socket.off("activeUsers", callback);
    };
  }, []);

    
  useEffect(() => {
    console.log('activeUsers', activeUsers);
  }, [activeUsers])

  if (!props.userId) {
    return <div>Please Log in</div>;
  }
  return (
    <>
    
      <h1>Lobby userID = {props.userId}</h1>
      <div className="u-flex u-relative Chatbook-container">
        
        <div className="Chatbook-userList">
          <UserList
            userId={props.userId}
            users={activeUsers}
          />
        </div>
      </div>
    </>
  );
}

export default Lobby;
