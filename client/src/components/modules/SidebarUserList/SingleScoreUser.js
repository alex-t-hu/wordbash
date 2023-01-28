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
  return (props.index != 0) ? (
    <div
      className={`SingleScoreUser-container u-pointer`}
    >
      {props.user}
      {props.score}
    </div>
  ) : (
    <div
      className={`SingleScoreUser-container u-pointer`}
    >
      {props.user} (host)
      
      {props.score}
    </div>
  );
}

export default SingleScoreUser;
