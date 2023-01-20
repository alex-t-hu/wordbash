import React from "react";

import "./Landing.css";
import "../../utilities.css"

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const Landing = () => {
  return (
    <div className>
      <div className="Landing-title u-textCenter">wordbash</div>
      <div className="Landing-optionContainer u-centerPage u-flexColumn">
        <button className="Landing-optionButton u-flex-alignCenter" id="Landing-joinGame">Join Game</button>
        <button className="Landing-optionButton u-flex-alignCenter" id="Landing-makeGame">Create Game</button>
      </div>
    </div>
  );
};

export default Landing;
