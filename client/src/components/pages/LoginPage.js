import React, { useState, useEffect } from "react";


import "../../utilities.css";
import "./Login.css";
import "./Skeleton.css";

import Background2 from "../modules/Background2.js";
import Background from "../modules/Background.js";

import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { TypeAnimation } from 'react-type-animation';

import ReactTypingEffect from 'react-typing-effect';


const GOOGLE_CLIENT_ID = "414404150327-qhpp3e5ihem4nvr38ba1vifiv04633ff.apps.googleusercontent.com";

/**
 * Define the "App" component
 */
const LoginPage = (props) => {

  return (
    <div className="text-center items-center flex flex-col">
        <div className="my-8 text-3xl">
            <TypeAnimation
                sequence={[
                    'Welcome to', // Types 'One'
                    () => {
                    console.log('Done typing!'); // Place optional callbacks anywhere in the array
                    }
                ]}
                wrapper="div"
                cursor={false}
                repeat={0}
                style={{ fontSize: '1.2em' }}
            />
        </div>
        <div className="my-8 text-8xl">
            <TypeAnimation
                sequence={[
                    1000,
                    'word', // Types 'One'
                    750, // Waits 1s
                    'wordbash', // Deletes 'One' and types 'Two'
                    4000,
                    '',
                    () => {
                    console.log('Done typing!'); // Place optional callbacks anywhere in the array
                    }
                ]}
                wrapper="div"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: '2em' }}
            />
        </div>
        <div className="flex flex-col justify-center items-center w-1/4 my-8 rounded-3xl ">
            {/* <h1 className="text-white w-full text-center text-xl p-2 bg-teal-500 rounded-t-3xl">
                Log In
            </h1> */}
            <div className="my-4">
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                        clientId={GOOGLE_CLIENT_ID}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} style={customStyle}>This is my custom Google button</button>
                        )}
                        buttonText="Login"
                        onSuccess={props.handleLogin}
                        onFailure={(err) => console.log(err)}
                        className="rounded-xl"
                    />
                </GoogleOAuthProvider>
            </div>
                
        </div>
        <Background2 className="-z-20" direction={"y"} colorX={["#ffddb4","#fcd0d0"]} colorY={["#ffddb4","#fcd0d0"]}/>
    </div>
  );
};

export default LoginPage;
