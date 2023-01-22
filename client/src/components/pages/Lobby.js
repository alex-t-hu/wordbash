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

  // Me
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "Lobby";
    // Figure out who I am
    if (props.userId) {
      get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    };
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

  if (!props.userId || !user) {
    return <div>Please Log in</div>;
  }
  return (
    <>
    
      <h1>Lobby userID = {props.userId} username = {user.name}</h1>
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
