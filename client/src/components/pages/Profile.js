import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities"

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState();

  const [value , setValue] = useState(""); // the current value of the input box
  const [editing, setEditing] = useState(false); // whether or not we are editing the name

  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/user`, { userid: props.userId }).then(
      (userObj) => {
        setUser(userObj);
        setValue(userObj.name);
      }
      );
  }, []);


    // called whenever the user types in the input box
  const handleChange = (event) => {
      console.log(event);
      setValue(event.target.value);
  };

  // called when the user hits "Submit"
  const handleSubmit = (event) => {
      event.preventDefault();
      post("/api/updateUserName", {
        name: value
      }).then( () => {
        get(`/api/user`, { userid: props.userId }).then(
          (userObj) => {
            setUser(userObj);
            setValue(userObj.name);
          }
          );
        console.log("Changed name to ", value);
      });

      setEditing(false);
      
  }



  if (!user) {
    return (<div> Loading! </div>);
  }
  return (
    <>
      <div
        className="Profile-avatarContainer"
      >
        <div className="Profile-avatar" />
      </div>
      {(editing ? (
      <div>
        <input type="text"
          value={value}
          onChange={handleChange}
          // placeholder={value}
        />
        
        <button className="Profile-editButton u-pointer" onClick={handleSubmit}>
          Edit
        </button>
        </div>
        ) : (
      <div>
        
        <h1 className="Profile-name u-textCenter">{value}</h1>
        
        <button className="Profile-editButton u-pointer" onClick={() => setEditing(true)}>
          Edit
        </button>

      </div>
      ))}
      <hr className="Profile-linejj" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">Highlights</h4>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">Win Ratio {user.games_won} / {user.games_played}</h4>
            <h4 className="Profile-subTitle">High score {user.high_score}</h4>
          </div>
        </div>
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">Friend user</h4>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle"></h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;