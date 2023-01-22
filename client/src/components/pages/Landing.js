import React from "react";

import "./Landing.css";
import "../../utilities.css"
import { Link } from "@reach/router";



const Landing = (props) => {
  if (!props.userId) {
    return <div>Please Log in</div>;
  }
  return (
    <div className>
      <div className="Landing-title u-textCenter">wordbash</div>
      <div className="Landing-optionContainer u-centerPage u-flexColumn">
          <button className="Landing-optionButton u-flex-alignCenter" id="Landing-joinGame" >
            <Link to={`/lobby/${props.userId}`} >Join Game</Link>
            </button>
        

        <button className="Landing-optionButton u-flex-alignCenter" id="Landing-makeGame">
          <Link to={`/lobby/${props.userId}`} >Create Game</Link>
        </button>
      </div>
    </div>
  );
};

export default Landing;
