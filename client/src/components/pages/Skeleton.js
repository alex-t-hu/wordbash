import React, {useState} from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";


Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

const prompts = ([" Nobody believes this_ until I show them the truth.",
      "I like to make life easier for everyone by___",
      "At the stroke of midnight my life changed forever when I suddenly ___",
      "If I could make $1 million dollars fast, I know I would___",
      "A preschooler proving to jealous fellow students he believed in Santa Claus despite small fingers no softness _.__",
      "I knew I was in trouble when Aunt Patty caught me ___",
      "If fantasy could come alive, what would it look like?",
      "What would really anger an ambulatory species of giant spiders?",
      "I dare you to ___.",
      "Funny excuses I gave ?when I got caught ______",
      "Reduce, reuse, and ___!",
      "There is something missing in my life, at mystery  that needs to be ____",
      "What do I need when my phone won't stop vibrating?"
      ]);

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "414404150327-qhpp3e5ihem4nvr38ba1vifiv04633ff.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  const [prompt, setPrompt] = useState("");
  const generateNewPrompt = () => {
      
      // setPrompt("What");
    setPrompt(prompts.random());
  };
  return (
    <div>
      
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
        
      </GoogleOAuthProvider>
      <div className="asdf" onClick={generateNewPrompt}>
        <h1> Please click me I'm lonely ;-;</h1>
      </div>
      <h1>{prompt}</h1>
    
    </div>
  );
};

export default Skeleton;
