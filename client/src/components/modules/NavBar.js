import React from "react";
import { Link } from "@reach/router";
// import GoogleLogin, { GoogleLogout } from "react-google-login";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
// import {GoogleOAuthProvider, GoogleLogin,  GoogleLogout } from "react-google-login";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "414404150327-qhpp3e5ihem4nvr38ba1vifiv04633ff.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Game Thing</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        {props.userId && (
          <Link to={`/profile/${props.userId}`} className="NavBar-link">
            Profile
          </Link>
        )}
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {props.userId ? (
          <button
            onClick={() => {
              googleLogout();
              props.handleLogout();
            }}
          >
            Logout
          </button>
          ) : (
            
          <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={props.handleLogin}
          onFailure={(err) => console.log(err)}
          className="NavBar-link NavBar-login"
        />
        
          
        )}
          </GoogleOAuthProvider> 
      </div>
    </nav>
  );
};

export default NavBar;
