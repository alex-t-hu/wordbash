import React, { useState, useEffect } from "react";
import { get } from "../../utilities"

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);
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
      <h1 className="Profile-name u-textCenter">{user.name}</h1>
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