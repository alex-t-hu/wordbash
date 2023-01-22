import React, {useState} from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import Landing from "./Landing.js"

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "414404150327-qhpp3e5ihem4nvr38ba1vifiv04633ff.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div>
      <Landing userId={userId}/>
    </div>
  );
};

export default Skeleton;
