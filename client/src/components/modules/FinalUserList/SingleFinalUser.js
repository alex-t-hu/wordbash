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
  // console.log(props.user);
  // console.log(props.index);

  const endings = [
    'st',
    'nd',
    'rd',
    'th',
  ];
  return (
    <div
    className={`SingleUser-container u-pointer`}
  >
    <div className = "grid grid-cols-3 items-center font-bold	text-6xl">
    {/* <div className = "flex flex-row items-center "> */}
          <div className = "flex-grow">
            <p className = "flex-grow text-center">{props.index + 1}{endings[Math.min(props.index,3)]}</p>
          </div>

       <div className = "flex flex-row items-center SingleUser-AvatarUser">

              <div className = "flex-grow">
                        <img className ="h-[64px] w-[64px] rounded-full mx-auto" src={props.avatar} 
                    />
              </div>
            <p className = "flex-grow font-bold">{props.user}</p>
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
