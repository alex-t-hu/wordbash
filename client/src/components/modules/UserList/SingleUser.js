import React, { useState, useEffect } from "react";

import {get, post} from "../../../utilities"

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
  // // console.logprops.user);
  // // console.logprops.index);

  return (
  <div className={`SingleUser-container`} >
    <div className = "grid grid-cols-[20%_10%_40%_10%_20%] items-center">
      
      <div className = "">
        <img className ="h-[32px] w-[32px] rounded-full" src={props.avatar} />
      </div>
      
      <div>

      </div>

      {props.returned ? (
        <p className = "flex-grow font-bold">{props.user}</p>
      ) : (
        <p className = "flex-grow text-red-600">{props.user}</p>
      )}

      {props.isYou ? "(You)" : <div></div>}
        
      { props.index == 0 ? 
        <div className = "flex justify-end">
          <img className ="h-[32px] w-[32px] rounded-full" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f451.png"/>
        </div> : <div></div>
      }
          
    </div>
  </div>
);
}

export default SingleUser;
