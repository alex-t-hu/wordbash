import React, { useEffect, useState } from "react";
import UserList from "../modules/UserList/UserList.js";
import TemperatureSlider from "../modules/TemperatureSlider.js";
import RoundSlider from "../modules/RoundSlider.js";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import {navigate} from "@reach/router";
import "./Lobby.css";
import PromptResponse from "../modules/PromptResponse.js";

const Lobby = (props) => {

  const [activeUsers, setActiveUsers] = useState([]);
  const [user, setUser] = useState(); // My name
  const [temperature, setTemperature] = useState(15);
  const [numRounds, setNumRounds] = useState(3);

  const [numPlayers, setNumPlayers] = useState(0); // Used to ensure numPlayers updates...
  const[Players, setPlayers] = useState([]); // Used to ensure Players updates...
  const [rejoin, setRejoin] = useState(false); // Used to ensure Rejoin updates...

  const [errorMessage, setErrorMessage] = useState("");
  const [hostPlayerId, setHostPlayerId] = useState("");
  
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

  useEffect(() => {
    const callback = (stuff) => {
        console.log("gah");
        props.setGame(stuff.game);
    };
    socket.on("gameUpdate", callback);
    return () => {
        socket.off("gameUpdate", callback);
    };
  },[]);

  useEffect(() => {
    if(props.userId && user && props.gameID){
      get("/api/game", {gameID: props.gameID}).then((data) => {
        if(data.players[props.userId] === undefined){
          post("/api/spawn", {gameID: props.gameID});
        }
        // console.log("data", data);
        if (props.setGame) {
          props.setGame(data);
        };
      });
    }
  }, [props.userId, user, props.gameID]);

  useEffect(() => {
    if(props.game && props.game.num_Players){
      setNumPlayers(props.game.num_Players);
    }
  }, [props.game.num_Players]);

  useEffect(() => {
    if(props.game && props.game["returnToLobby"]){
      setRejoin(props.game["returnToLobby"]);
    }
  }, [props.game["returnToLobby"]]);

  useEffect(() => {
    if(props.game && props.game.players){
      setPlayers(props.game.players);
      setHostPlayerId(props.game.players[0].id);
    }
  }, [props.game.players]);
  
  
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
    
    if (numPlayers < 2) {
      setErrorMessage("Cannot start game without at least two players.");
    } else {
      post("/api/startGame", {
        gameID: props.gameID,
        temperature: temperature,
        numRounds: numRounds,
      }).then((g) => {
        console.log("Game created ");

      });
    }    
  };

  const handleCloseError = (event) => {
    event.preventDefault();

    setErrorMessage("");
  }

  /**
   * We need to constantly check if the game has been started yet.
   * If the game has been started, redirected to the game page.
   */
  useEffect(() => {
    if (props.game && props.game.started) {
      navigate(`/game/${props.gameID}/prompt`);
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
    <div className="h-full flex flex-col items-center p-12">
      {/*Player list and game code*/}
      <div className="h-[50%] w-full flex flex-row divide-x space-x-4 justify-center">

        <div className="w-full bg-gray-50 flex flex-col rounded-xl">
          <div className="text-center bg-[#615756] text-white font-bold py-2 rounded-t-xl">
            <h1>Players ({numPlayers})</h1>
          </div>

          <div className="items-center m-4">
            <UserList
              userId={props.userId}
              users={Players}
              returned = {rejoin}
            />
          </div>
        </div>

        <div className="w-full bg-gray-50 flex flex-col rounded-xl space-y-4">
          <div className="text-center bg-[#615756] text-white font-bold py-2 rounded-t-xl">
            <h1>Game Settings</h1>
          </div>

          <div className="w-full">
            <TemperatureSlider temperature={temperature} setTemperature={setTemperature} />
          </div>
          
          <div className="w-full">
            <RoundSlider numRounds = {numRounds} setNumRounds = {setNumRounds} numPlayers = {props.game.num_Players}/>
          </div>
        </div>

      </div>

      <div className="flex flex-col space-y-2 w-full mt-4">
        <button className={props.userId === hostPlayerId ? `w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition ease-in-out delay-50 hover:scale-[1.05] hover:scale-130 duration-300`
        : `w-full bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:cursor-not-allowed opacity-50`}
               disabled= {props.userId !== hostPlayerId}
        // TOOD: add a check to make sure there are at least 3 players
        onClick = {handleSubmit}>
          START GAME
        </button>

        {errorMessage && 
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative animate-fade-in-down" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-current h-6 w-6 text-red-500" onClick={handleCloseError} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        }
      </div>
      
    </div>
  );
}

export default Lobby;
