import React from "react";

import "./Landing.css";
import './Skeleton.css';
import "../../utilities.css"
import { Link } from "@reach/router";
import { useState } from "react";

import LoginPage from "./LoginPage.js"

import { get, post } from "../../utilities";
import { navigate } from "@reach/router";



const Landing = (props) => {

  const [value, setValue] = useState("");

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

    // Spawn then redirect to lobby.
    get("/api/gameExists", {gameID: value.toUpperCase()}).then((game) => {
      console.log("Game is: ", game.gameExists);
      if(!game.gameExists){
        console.log("Game does not exist (inside Landing.js)");
      }else{
        console.log("Game exists (inside Landing.js)");
        props.setGameID(value.toUpperCase());
        post("/api/spawn", {gameID: value.toUpperCase()}).then((g) => {
          console.log("Spawned");
          navigate(`/game/${value.toUpperCase()}/lobby`);
        });
      }
    });
  };

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
            window.location.href = `/game/${randomCode}/lobby`;
          });
        });
      } else {
        console.log("oops");
        handleSubmitCreate(event);
      }
    });
  };
  


  if (!props.userId) {
    return (
      <LoginPage handleLogin={props.handleLogin}/>
    );
  }
  return (
    <div>
      <div className="Landing-optionContainer rounded-3xl u-centerPage u-flexColumn bg-gray-50">
        <div className="flex flex-row m-8">
          <input
            type="text"
            placeholder="Enter Game Code"
            value={value}
            onChange={handleChange}
            className="NewPostInput-input w-full border border-gray-400 rounded px-4 py-2"
          />
          
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick = {handleSubmitJoin}>
            {/* TODO: This stuff gives errors for some reason? */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </button>
        </div>
        
        <div>
          <h1 className="text-center">or</h1>
        </div>

        <div className="m-8">
          <button className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick = {handleSubmitCreate}>
            Create Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
