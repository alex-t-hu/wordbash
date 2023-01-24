import React, { useEffect, useState } from "react";
import UserList from "../modules/UserList.js";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";

import "./Lobby.css";

const Lobby = (props) => {

  const [activeUsers, setActiveUsers] = useState([]);
  const [user, setUser] = useState(); // My name

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
    
    post("/api/startGame", {gameID: props.gameID}).then((g) => {
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
    <div className="flex flex-row justify-center border p-8">
      <div className="p-16 flex flex-col items-center mx-4 border-4 border-teal-500 rounded-md">
        {/*<h1 className="">Lobby userID = {props.userId}</h1>*/}
        {/*<h1 className=""> user = {user.name}</h1>*/}
        <h1 className="text-lg">Game Code:</h1>
        <input className="text-center border border-gray-400 rounded" type="text" value={props.gameID} readOnly></input>
      </div>
      
      <div className="bg-gray-50 flex flex-col">
        <div className="w-full text-center bg-teal-500 text-white p-4">
          <h3>PLAYERS</h3>
        </div>
        <div className="flex items-center mx-4 border border-gray-400">
          <UserList
            userId={props.userId}
            users={props.game.players}
          />
        </div>
        <div className="">
          <button onClick = {handleSubmit}>
            Start Game
          </button>
        </div>
      </div>

    </div>
  );
}

export default Lobby;
