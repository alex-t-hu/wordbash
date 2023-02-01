import React, { useState, useEffect } from "react";

import "./SingleScoreUser.css";

/**
 * Component to render an online user
 *
 * Proptypes
 * @param {(UserObject) => ()} setActiveUser function that takes in user,
 *  sets it to active
 * @param {UserObject} user
 * @param {boolean} active
 */

const SingleScoreUser = (props) => {
  // // console.logprops.user);
  // // console.logprops.index);

  const endings = [
    'st',
    'nd',
    'rd',
    'th',
  ];
  if(props.allZero){
    return (
    
      <div className={`grid grid-cols-[30px_auto_50px] gap-2 my-2 text-lg`}>
        <h1 className="text-right">{(props.index + 1) + endings[Math.min(props.index, 3)]}</h1>
        <h1 className="text-center font-bold in-line overflow-x-hidden text-ellipsis">{props.user}</h1>
        <h1 className="text-center">{props.score}</h1>
      </div>
    )
  }else{
    return (
      <div className={`grid grid-cols-[30px_auto_50px_60px] gap-2 my-2 text-lg`}>
        <h1 className="text-right">{(props.index + 1) + endings[Math.min(props.index, 3)]}</h1>
        <h1 className="text-center font-bold in-line overflow-x-hidden text-ellipsis">{props.user}</h1>
        <h1 className="text-center">{props.score}</h1>
        <h1 className="text-center text-emerald-500 font-bold	">{props.scoreIncrease !== 0 && `(+${props.scoreIncrease})`}</h1>
      </div>
    )

  }
}

export default SingleScoreUser;
