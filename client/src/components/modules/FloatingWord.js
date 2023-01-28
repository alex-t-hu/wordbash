import React from "react";
import { Link } from "@reach/router";
// import GoogleLogin, { GoogleLogout } from "react-google-login";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
// import {GoogleOAuthProvider, GoogleLogin,  GoogleLogout } from "react-google-login";

import {get, post} from "../../utilities";
import { TypeAnimation } from 'react-type-animation';

import {useState, useEffect} from "react";

import "./FloatingWord.css";
import "../pages/Skeleton.css"

const FloatingWord = (props) => {

    return (
        <div className='relative w-full h-screen'>
            <TypeAnimation
                sequence={[
                    `${props.word}`, // Types 'One'
                    1000, // Waits 1s
                    '',
                    () => {
                        console.log('Done typing!'); // Place optional callbacks anywhere in the array
                    }
                ]}
                wrapper="div"
                cursor={true}
                repeat={5}
                speed={Math.floor(Math.random() * 40 + 20)}
                deletionSpeed={10}
                style={{
                        position: "relative",
                        left: `${props.x}%`,
                        top: `${props.y}%`,
                        color: `${props.color}`,
                    }}
            />
        </div>
    );
};

export default FloatingWord;
