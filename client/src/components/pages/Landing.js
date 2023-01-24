import React from "react";

import "./Landing.css";
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
  const handleSubmit = (event) => {
    event.preventDefault();

    
    // Spawn then redirect to lobby.
    get("/api/gameExists", {gameID: value}).then((game) => {
      console.log("Game is: ", game.gameExists);
      if(!game.gameExists){
        console.log("Game does not exist (inside Landing.js)");
        post("/api/createGame", {gameID: value}).then((g) => {
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
      <div className="Landing-title u-textCenter">wordbash</div>
      <div className="Landing-optionContainer u-centerPage u-flexColumn">
        <input
        type="text"
          placeholder="Enter Game Code"
          value={value}
          onChange={handleChange}
          className="NewPostInput-input"
        />
        <button className="Landing-optionButton u-flex-alignCenter" id="Landing-makeGame"
        onClick = {handleSubmit}>
          Create Game
        </button>
      </div>
    </div>
  );
};

export default Landing;
