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
    <div className = "grid grid-cols-[20%_40%_20%_20%] items-center text-4xl">
      
      <div className = "">
        <img className ="h-[100px] w-auto rounded-lg" src={props.avatar} />
      </div>
      
      {/* <div>

      </div> */}

      {props.returned ? (
        <p className = "flex-grow font-bold">{props.user}</p>
      ) : (
        <p className = "flex-grow text-red-600">{props.user}</p>
      )}

      {props.isYou ? "(You)" : <div></div>}
        
      { props.index == 0 ? 
        <div className = "flex justify-end">
          {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
          <g>
            <path d="M63.55,170.89l23.21,156.88h338.97l23.08-159.17l-92.97,80.39l-99.93-128.47L151.87,248.55L63.55,170.89z M330.71,129.98   l-2.05,1.79l3.74,0.36l31.06,39.9L401.69,139l3.74,0.36l-1.66-2.18l64.22-55.52c11.12-9.62,27.94-8.37,37.53,2.75   c5.04,5.85,7.3,13.57,6.21,21.18L471.81,381H40.84L0.29,106.88c-2.16-14.55,7.88-28.1,22.4-30.25c7.77-1.17,15.65,1.17,21.52,6.34   l61.23,53.9l-1.33,1.59l2.91-0.21l38.41,33.79l32.25-39.74l2.91-0.23l-1.59-1.38l56.71-69.71c9.28-11.41,26.04-13.13,37.43-3.85   l4.21,4.31l53.36,68.54H330.71z M42.92,407.61h425.83v26.61c0,14.68-11.93,26.61-26.61,26.61H69.53   c-14.71,0-26.61-11.93-26.61-26.61V407.61z"/>
          </g>
          </svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 512 512" stroke-width="1.5" stroke="currentColor" class="w-[60px] h-[60px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M63.55,170.89l23.21,156.88h338.97l23.08-159.17l-92.97,80.39l-99.93-128.47L151.87,248.55L63.55,170.89z M330.71,129.98   l-2.05,1.79l3.74,0.36l31.06,39.9L401.69,139l3.74,0.36l-1.66-2.18l64.22-55.52c11.12-9.62,27.94-8.37,37.53,2.75   c5.04,5.85,7.3,13.57,6.21,21.18L471.81,381H40.84L0.29,106.88c-2.16-14.55,7.88-28.1,22.4-30.25c7.77-1.17,15.65,1.17,21.52,6.34   l61.23,53.9l-1.33,1.59l2.91-0.21l38.41,33.79l32.25-39.74l2.91-0.23l-1.59-1.38l56.71-69.71c9.28-11.41,26.04-13.13,37.43-3.85   l4.21,4.31l53.36,68.54H330.71z M42.92,407.61h425.83v26.61c0,14.68-11.93,26.61-26.61,26.61H69.53   c-14.71,0-26.61-11.93-26.61-26.61V407.61z" />
            </svg>

          {/* <img className ="h-[60px] w-[60px]" src="/crown.png"/> */}
        </div> : <div></div>
      }
          
    </div>
  </div>
);
}

export default SingleUser;
