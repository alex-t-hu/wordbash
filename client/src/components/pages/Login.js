import React, { useState, useEffect } from "react";


import "../../utilities.css";
import "./Login.css";
import "./Skeleton.css";

import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";


const GOOGLE_CLIENT_ID = "414404150327-qhpp3e5ihem4nvr38ba1vifiv04633ff.apps.googleusercontent.com";

/**
 * Define the "App" component
 */
const Login = (props) => {

  return (
    <div className="text-center items-center flex flex-col">
        <div className="my-8 text-3xl">
            <h1 className="">
                Welcome to
            </h1>
        </div>
        <div className="my-8 text-8xl">
            <h1>
            wordbash
            </h1>
        </div>
        <div className="flex flex-col justify-center items-center w-1/4 my-8 rounded-3xl bg-gray-50">
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
    </div>
  );
};
export default Login;
