import React from "react";

import "./Landing.css";
import './Skeleton.css';
import "../../utilities.css"
import { Link } from "@reach/router";
import { useState } from "react";

import { get, post } from "../../utilities";



const Landing = (props) => {

  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    console.log(event);
    setValue(event.target.value);
    props.setGameID(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmitJoin = (event) => {
    event.preventDefault();

    
    // Spawn then redirect to lobby.
    get("/api/gameExists", {gameID: value}).then((game) => {
      console.log("Game is: ", game.gameExists);
      if(!game.gameExists){
        console.log("Game does not exist (inside Landing.js)");
        post("/api/createGame", {gameID: value, userID: props.userId}).then((g) => {
          console.log("Game created because ");
          post("/api/spawn", {gameID: value}).then((g) => {
            console.log("Spawned");
            window.location.href = `/lobby/${value}`;
          });
        });
      }else{
        console.log("Game exists (inside Landing.js)");
        post("/api/spawn", {gameID: value}).then((g) => {
          console.log("Spawned");
          window.location.href = `/lobby/${value}`;
        });
      }
    });
      };

  const handleSubmitCreate = (event) => {
    event.preventDefault();

    // Spawn then redirect to lobby.
    get("/api/gameExists", {gameID: value}).then((game) => {
      console.log("Game is: ", game.gameExists);
      if(!game.gameExists){
        console.log("Game does not exist (inside Landing.js)");
        post("/api/createGame", {gameID: value, userID: props.userId}).then((g) => {
          console.log("Game created because ");
          post("/api/spawn", {gameID: value}).then((g) => {
            console.log("Spawned");
            window.location.href = `/lobby/${value}`;
          });
        });
      }else{
        console.log("Game exists (inside Landing.js)");
        post("/api/spawn", {gameID: value}).then((g) => {
          console.log("Spawned");
          window.location.href = `/lobby/${value}`;
        });
      }
    });
      };
  


  if (!props.userId) {
    return <div>Please Log in</div>;
  }
  return (
    <div className>
      <div className="Landing-optionContainer u-centerPage u-flexColumn bg-gray-50">
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
            {'>'}
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
