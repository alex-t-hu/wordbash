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

    const [position, setPosition] = useState([props.x, props.y]);

    const setRandomPosition = () => {
        setPosition([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]);
    }

    return (
        <div className='relative w-full h-screen'>
            <TypeAnimation
                sequence={[
                    `${props.word}`, // Types 'One'
                    1000, // Waits 1s
                    '',
                    () => {
                        // console.log'Done typing!'); // Place optional callbacks anywhere in the array
                        setRandomPosition();
                        
                    }
                ]}
                wrapper="div"
                cursor={true}
                repeat={Infinity}
                speed={Math.floor(Math.random() * 40 + 20)}
                deletionSpeed={10}
                style={{
                        position: "relative",
                        left: `${position[0]}%`,
                        top: `${position[1]}%`,
                        color: `${props.color}`,
                    }}
            />
        </div>
    );
};

export default FloatingWord;
