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
        // console.log("data", data);
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

  
  // called when the user hits "Submit" 
  const handleSubmit = (event) => {
    event.preventDefault();
    
    post("/api/startGame", {gameID: value}).then((g) => {
      console.log("Game created ");
    });
  };

  /**
   * We need to constantly check if the game has been started yet.
   * If the game has been started, redirected to the game page.
   */
  useEffect(() => {
    if (props.game && props.game.started) {
      window.location.href = `/prompt/${props.gameID}`;
    }
  }, [props.game]);


  

  if (!props.userId) {
    return <div>Please Log in</div>;
  }
  // else{
  //   console.log("props.userId", props.userId)
  // }
  if( !props.gameID ){
    return <div>Please Create a Game</div>;
  }
  if (!user) {
    return <div>No User</div>;
  }
  
  if (!props.game || !props.game.players) {
    return <div>No Game</div>;
  }
  return (
    <>
      <h1>Lobby userID = {props.userId} user = {user.name} gameID = {props.gameID}</h1>
      <div className="u-flex u-relative Chatbook-container">
        
        <div className="Chatbook-userList">
          <UserList
            userId={props.userId}
            users={props.game.players}
          />
        </div>
      </div>
    </>
  );
}

export default Lobby;
