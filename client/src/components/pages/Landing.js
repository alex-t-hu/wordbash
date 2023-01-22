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
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    
    post("/api/spawn", {
      userId: props.userId,
      body: {
        gameId: value,
      }
    });
    props.setGameID(value)
    
    console.log(`Game created successfully! Game code = ${value}`);
     window.open(`/lobby/${props.userId}/${value}`);
    // window.location.href = `/lobby/${value}`;
  };
  


  if (!props.userId) {
    return <div>Please Log in</div>;
  }
  return (
    <div className>
      <div className="Landing-title u-textCenter">wordbash</div>
      <div className="Landing-optionContainer u-centerPage u-flexColumn">
          {/* <button className="Landing-optionButton u-flex-alignCenter" id="Landing-joinGame" >
            <Link to={`/lobby/${props.userId}`} >Join Game</Link>
            </button> */}
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
