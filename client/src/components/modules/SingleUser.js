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
  console.log(props.user);
  console.log(props.index);
  return (props.index != 0) ? (
    <div
      className={`SingleUser-container u-pointer`}
      // onClick={() => {
      //   props.setActiveUser(props.user);
      // }}
    >
      {props.user}
    </div>
  ) : (
    <div
      className={`SingleUser-container u-pointer`}
      // onClick={() => {
      //   props.setActiveUser(props.user);
      // }}
    >
      {props.user} (host)
    </div>
  );
}

export default SingleUser;
