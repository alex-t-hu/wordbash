import React from "react";
import { Link } from "@reach/router";
// import GoogleLogin, { GoogleLogout } from "react-google-login";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
// import {GoogleOAuthProvider, GoogleLogin,  GoogleLogout } from "react-google-login";

import "./NavBar.css";
import "../pages/Skeleton.css"

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "414404150327-qhpp3e5ihem4nvr38ba1vifiv04633ff.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container bg-teal-500">
      <div className="u-inlineBlock">
        <Link to="/" className="NavBar-title">
          wordbash
        </Link>
      </div>
      <div className="NavBar-linkContainer u-inlineBlock">
        {props.userId && (
          <Link to={`/profile/${props.userId}`} className="NavBar-link">
            Profile
          </Link>
        )}
        <Link to="/lobby/" className="NavBar-link">
          Lobby
        </Link>
        
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {props.userId ? (
          <button
            onClick={() => {
              googleLogout();
              props.handleLogout();
            }}
            className="NavBar-link NavBar-logout"
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
