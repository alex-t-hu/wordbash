import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/NavBar.js"
import Profile from "./pages/Profile.js";
import Lobby from "./pages/Lobby.js";



import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    setUserId(null);
    post("/api/logout");
  };

  return (
    <>
      <div className="App-container">
        <NavBar
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          userId={userId}
        />
        <Router>
          <Skeleton path="/" userId={userId} />
          {/* <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} /> */}
          <Profile path="/profile/:userId" />
          <Lobby path="/lobby/" userId={userId} />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};
// return (
//   <>
//     <NavBar
//       handleLogin={handleLogin}
//       handleLogout={handleLogout}
//       userId={userId}
//     />
//     <div className="App-container">
//       <Router>
//         <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
//         <Profile path="/profile/:userId" />
//         <NotFound default />
//       </Router>
//     </div>
//   </>
// );

export default App;
