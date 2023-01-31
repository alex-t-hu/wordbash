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
  return (
    <div
      className={`SingleScoreUser-container flex flex-row u-pointer`}
    >
      <h1 className="overflow-x-hidden text-ellipsis">{props.user}</h1>
      {props.score}
    </div>
  );
}

export default SingleScoreUser;
