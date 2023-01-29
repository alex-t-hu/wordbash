import React, { useEffect } from "react";

import "./Landing.css";
import './Skeleton.css';
import "../../utilities.css"
import { Link } from "@reach/router";
import { useState } from "react";
import ManyWords from "../modules/ManyWords.js";

import LoginPage from "./LoginPage.js"
import Background from "../modules/Background.js"

import { get, post } from "../../utilities";
import { navigate } from "@reach/router";

const Landing = (props) => {

  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setValue("");
  }, []);

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    console.log(event);
    setValue(event.target.value);
    props.setGameID(event.target.value);
  };

  const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // called when the user hits "Submit" for a new post
  const handleSubmitJoin = (event) => {
    
    event.preventDefault();

    if (value.length == 0) {
      setErrorMessage("Enter a valid 4-letter code.");
    } else if (value.length != 4) {
      setErrorMessage("Game code must be 4 letters.");
      setValue("");
    } else {
      // Spawn then redirect to lobby.
      get("/api/gameExists", {gameID: value.toUpperCase()}).then((game) => {
        console.log("Game is: ", game.gameExists);
        if(!game.gameExists){
          console.log("Game does not exist (inside Landing.js)");
          setErrorMessage("Enter a valid game code.");
          setValue("");
        }else{
          console.log("Game exists (inside Landing.js)");
          props.setGameID(value.toUpperCase());
          post("/api/spawn", {gameID: value.toUpperCase()}).then((g) => {
            console.log("Spawned");
            navigate(`/game/${value.toUpperCase()}/lobby`);
          });
        }
      });
    }
  };

  const handleCloseError = (event) => {
    event.preventDefault();

    setErrorMessage("");
  }

  const handleSubmitCreate = (event) => {
    event.preventDefault();

    // Create room with random code and spawn in
    let randomCode = makeid(4);
    console.log(randomCode);

    get("/api/gameExists", {gameID: randomCode}).then((game) => {
      if(!game.gameExists){
        props.setGameID(randomCode);
        console.log("Game does not exist (inside Landing.js)");
        post("/api/createGame", {gameID: randomCode, userID: props.userId}).then((g) => {
          console.log("Game created because ");
          post("/api/spawn", {gameID: randomCode}).then((g) => {
            console.log("Spawned");
            navigate(`/game/${randomCode}/lobby`);
          });
        });
      } else {
        console.log("oops");
        handleSubmitCreate(event);
      }
    });
  }; 

  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      handleSubmitJoin(event);
    }
  }

  //bg-[url('../../../../bubbles.gif')]

  if (!props.userId) {
    return (
      <LoginPage handleLogin={props.handleLogin}/>
    );
  }
  return (
    <div className="flex w-full h-screen justify-center align-center">
      <div className="Landing-blah">
        {errorMessage && 
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative animate-fade-in-up" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-current h-6 w-6 text-red-500" onClick={handleCloseError} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        }
        <div className="Landing-optionContainer drop-shadow-2xl rounded-xl u-flexColumn bg-[#E0E0E2]">
          
          
          <div className="flex flex-row m-8">
            <input
              id="myInput"
              type="text"
              placeholder="Enter Game Code"
              value={value}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded px-4 py-2"
              onKeyDown={handleKeyPressed}
            />
            <button 
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition ease-in-out delay-50 hover:translate-x-1 hover:scale-130 duration-300"
              onClick = {handleSubmitJoin}
              id="myBtn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </button>
          </div>
          
          <div>
            <h1 className="text-center">or</h1>
          </div>

          <div className="m-8">
            <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-130 duration-300"

            onClick = {handleSubmitCreate}>
              Create Game
            </button>
          </div>
        </div>
      </div>
      {/* <ManyWords /> */}
      <Background className="-z-20"/>
    </div>
    
  );
};

export default Landing;
