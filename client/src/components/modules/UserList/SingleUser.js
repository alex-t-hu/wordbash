import React, { useState, useEffect } from "react";

import "./SingleUser.css";

/**
 * Component to render an online user
 *
 * Proptypes
 * @param {(UserObject) => ()} setActiveUser function that takes in user,
 *  sets it to active
 * @param {UserObject} user
 * @param {boolean} active
 */
const SingleUser = (props) => {
  // console.log(props.user);
  // console.log(props.index);
  return (
  <div
  className={`SingleUser-container u-pointer`}
>
  <div className = "grid grid-cols-3 items-center">
  {/* <div className = "flex flex-row items-center "> */}
      
    <div className = "flex-grow">
              <img className ="h-[32px] w-[32px] rounded-full" src={props.avatar} 
          />
              </div>

      <p className = "flex-grow font-bold">{props.user}</p>
      { props.index == 0 && <div className = "flex-grow"><img className ="h-[32px] w-[32px] rounded-full" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f451.png"/>
      </div>}
      


      {/* </div> */}
    </div>
</div>
);
}

export default SingleUser;
