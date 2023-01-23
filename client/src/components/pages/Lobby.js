import React, { useEffect, useState } from "react";
import UserList from "../modules/UserList.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Lobby.css";

const Lobby = (props) => {

  const [activeUsers, setActiveUsers] = useState([]);

  // Me
  const [user, setUser] = useState();

  /**
   * This effect is run when the component mounts.
   */

  useEffect(() => {
    document.title = "Lobby";
    get("/api/activeUsers").then((data) => {
      if (props.userId) {
        setActiveUsers(data.activeUsers);
      };
    });
  }, []);

  /**
   * This effect is run every time any state variable changes.
   */
  
  useEffect(() => {
    if(props.userId && user && props.gameID){
      get("/api/game", {gameID: props.gameID}).then((data) => {
        console.log("data", data);
        if (props.setGame) {
          props.setGame(data);
        };
      });
    }
  });
  
  useEffect(() => {
    const callback = (data) => {
      setActiveUsers(data.activeUsers);
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
    console.log('userID effect: userID is', props.userId);
    if (props.userId) {
      get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    }
  }, [props.userId]);


  useEffect(() => {
    console.log('user effect: user is', user);
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
