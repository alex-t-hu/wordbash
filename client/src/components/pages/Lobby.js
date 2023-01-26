import React, { useEffect, useState } from "react";
import UserList from "../modules/UserList.js";
import TemperatureSlider from "../modules/TemperatureSlider.js";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import {navigate} from "@reach/router";
import "./Lobby.css";

const Lobby = (props) => {

  const [activeUsers, setActiveUsers] = useState([]);
  const [user, setUser] = useState(); // My name
  const [temperature, setTemperature] = useState(15);
  const [numRounds, setNumRounds] = useState(3);

  /**
   * This effect is run when the component mounts.
   */

  useEffect(() => {
    document.title = "Lobby";
    get("/api/activeUsers").then((data) => {
      if (props.userId) {
        setActiveUsers(data.activeUsers);
        console.log("active users", data.activeUsers);
      };
    });
  }, []);



  /**
   * This effect is run every time any state variable changes.
   */
  
  // useEffect(() => {
  //   console.log("game effect is ");
  //   if(props.userId && user && props.gameID){
  //     get("/api/game", {gameID: props.gameID}).then((data) => {
  //       // console.log("data", data);
  //       if (props.setGame) {
  //         props.setGame(data);
  //       };
  //     });
  //   }
    
  // }, []);
  if(props.userId && user && props.gameID){
    get("/api/game", {gameID: props.gameID}).then((data) => {
      // console.log("data", data);
      if (props.setGame) {
        props.setGame(data);
      };
    });
  }
  
  useEffect(() => {
    const callback = (data) => {
      setActiveUsers(data.activeUsers);
    };
    socket.on("activeUsers", callback);
    return () => {
      socket.off("activeUsers", callback);
    };
  }, []);
  // useEffect(() => {
  //   const callback = (data) => {
  //     if (data.gameID === props.gameID) {
  //       window.location.href = `/prompt/${props.gameID}`;
  //     }
  //   };
  //   socket.on("game", callback);
  //   // return () => {
  //   //   socket.off("game", callback);
  //   // };
  // }, []);
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
    
    post("/api/startGame", {
      gameID: props.gameID,
      temperature: temperature,
      numRounds: numRounds,
    }).then((g) => {
      console.log("Game created ");
    });
  };

  /**
   * We need to constantly check if the game has been started yet.
   * If the game has been started, redirected to the game page.
   */
  useEffect(() => {
    if (props.game && props.game.started) {
      navigate(`/game/${props.gameID}/prompt`);
    }
  }, [props.game.started]);


  

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
    <div className="flex flex-col items-center mx-60 my-16 bg-white">
      <div className="w-full flex flex-row justify-center">
        <div className="w-full bg-gray-50 flex flex-col mr-2">
          <div className="w-full text-center bg-teal-500 text-white py-2">
            <h3>Players ({props.game.num_Players})</h3>
          </div>

          <div className="flex items-center m-4">
            <UserList
              userId={props.userId}
              users={props.game.players}
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 flex flex-col items-center ml-2 rounded-md">
          {/*<h1 className="">Lobby userID = {props.userId}</h1>*/}
          {/*<h1 className=""> user = {user.name}</h1>*/}
          <h1 className="">Game Code:</h1>
          <input className="text-3xl text-center border border-gray-400 rounded" type="text" value={props.gameID} readOnly></input>
          <TemperatureSlider temperature={temperature} setTemperature={setTemperature} />
          <RoundSlider numRounds = {numRounds} setNumRounds = {setNumRounds} numPlayers = {props.game['num_Players']}/>
        </div>

      </div>

      <div className="w-full mt-4">
        <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick = {(props.game.num_Players > 1) ? handleSubmit: null}>
          START GAME
        </button>
      </div>
    </div>
  );
}

export default Lobby;
