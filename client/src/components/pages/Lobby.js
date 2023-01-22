import React, { useEffect, useState } from "react";
import UserList from "../modules/UserList.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Lobby.css";

const Lobby = (props) => {

  const [activeUsers, setActiveUsers] = useState([]);

  // Me
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "Lobby";
    // Figure out who I am
    // if (props.userId) {
      console.log("dude what the fuck");
        get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));

    //   get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    // }else{
    //   console.log("dude what the fuck ARGH");
    // };
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
  }, [activeUsers]);

  
  useEffect(() => {
    console.log('user', user);
  }, [user]);

  if (!props.userId) {
    return <div>Please Log in</div>;
  }else{
    console.log("props.userId", props.userId)
  }
  if( !props.gameID ){
    return <div>Please Create a Game</div>;
  }
  if (!user) {
    return <div>No User</div>;
  }
  return (
    <>
    
      <h1>Lobby userID = {props.userId} user = {user.name} gameID = {props.gameID}</h1>
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
