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
  // console.log(props.user);
  // console.log(props.index);

  const endings = [
    'st',
    'nd',
    'rd',
    'th',
  ];

  return (
    <div className={`grid grid-cols-[50px_auto_50px] gap-4 my-2`}>
      <h1 className="text-center">{(props.index + 1) + endings[Math.min(props.index, 3)]}</h1>
      <h1 className="text-left in-line overflow-x-hidden text-ellipsis">{props.user}</h1>
      <h1 className="text-center">{props.score}</h1>
    </div>
  );
}

export default SingleScoreUser;
