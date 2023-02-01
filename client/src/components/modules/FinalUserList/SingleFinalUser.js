import React, { useState, useEffect } from "react";

import "./SingleFinalUser.css";

/**
 * Component to render an online user
 *
 * Proptypes
 * @param {(UserObject) => ()} setActiveUser function that takes in user,
 *  sets it to active
 * @param {UserObject} user
 * @param {boolean} active
 */

const SingleFinalUser = (props) => {
  // // console.logprops.user);
  // // console.logprops.index);

  const endings = [
    'st',
    'nd',
    'rd',
    'th',
  ];
  const colors = [
    'bg-amber-300',
    'bg-zinc-100',
    'bg-amber-700',
    'bg-zinc-400',
  ];
  return (
    <div
    className={`SingleFinalUser-container u-pointer`}
  >
    <div className = "grid grid-cols-[20%_60%_20%] items-center font-bold	text-6xl">
    {/* <div className = "flex flex-row items-center "> */}
          <div className = "flex-grow">
            <p className = "flex-grow text-center">{props.index + 1}{endings[Math.min(props.index,3)]}</p>
          </div>

       <div className = {`flex flex-row space-x-4 justify-center items-center ${colors[Math.min(props.index,3)]} rounded-2xl py-2 px-4`}>

              <div className = "">
                        <img className ="h-[64px] w-[64px] rounded-full mx-auto" src={props.avatar} 
                    />
              </div>
            <p className = " font-bold">{props.user}</p>
        </div>

        {/* { props.index == 0 && <div className = "flex-grow"><img className ="h-[32px] w-[32px] rounded-full" src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f451.png"/>
        </div>} */}
        
        {/* <div className = "flex-grow"> */}
        <p className = "flex-grow text-center">{props.score}</p>
        {/* </div> */}
  
        {/* </div> */}
      </div>
  </div>
  );
}

export default SingleFinalUser;
