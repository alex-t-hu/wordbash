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
  <div className={`SingleUser-container ${props.modifiable && "hover:bg-red-100 hover:cursor-pointer"}`} >
    <div className = "flex flex-row items-center">
      
      <div className = "flex-grow">
        <img className ="h-[32px] w-[32px] rounded-full" src={props.avatar} />
      </div>
      
      {props.returned ? (
        <p className = "flex-grow font-bold">{props.user}</p>
      ) : (
        <p className = "flex-grow text-red-600">{props.user}</p>
      )}
        
      { props.index == 0 && 
        <div className = "flex-grow">
          <img className ="h-[32px] w-[32px] rounded-full" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f451.png"/>
        </div>
      }

      {props.modifiable && 
        <div >
          <svg className="fill-current h-6 w-6 text-red-500" onClick={props.handleClickError} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </div>
      }
          
    </div>
  </div>
);
}

export default SingleUser;
