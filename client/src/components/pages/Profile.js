import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities"
import Background2 from "../modules/Background2.js"
import "../../utilities.css";
import "./Profile.css";
import ProfileSelector from "../modules/ProfileSelector.js"

const Profile = (props) => {
    const [user, setUser] = useState();
    const [value , setValue] = useState(""); // the current value of the name
    const [value2, setValue2] = useState(""); // the current value of the image url
    const [editing, setEditing] = useState(false); // whether or not we are editing the name
    const [editing2, setEditing2] = useState(false); // whether or not we are editing the name

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
        });
        setEditing(false);
    }

    
        // called whenever the user types in the input box
        const handleChange2 = (event) => {
            console.log(event);
            setValue2(event.target.value);
    };

    // called when the user hits "Submit"
    const handleSubmit2 = (event) => {
        event.preventDefault();
        post("/api/updateUserAvatar", {
            avatar: value2
        });
        setEditing2(false);
    }




    if (!user) {
        return (<div> Loading! </div>);
    }
    return (
            <div className="flex flex-row w-full h-full">
                <div className = "w-[50%] flex flex-col justify-around">
                    <div
                        className="Profile-avatarContainer h-[50%]"
                    >
                        <img className="Profile-avatar h-full aspect-auto" src={user.avatar} alt="Profile" />
                    </div>
                    <h1 className="Profile-name u-textCenter">
                        {editing ? (
                        <div>
                            <input type="text"
                                placeholder={value}
                                onChange={handleChange}
                            />
                            
                                <button className="Profile-editButton u-pointer" onClick={handleSubmit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                    </svg>
                                </button>
                        </div>
                        ) : (
                        <div>

                            {value + "  "}
                            <button className="Profile-editButton u-pointer"  onClick={() => setEditing(true)}>
                            
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                        </div>
                        )}
                    </h1>
                    <h2 className="Profile-subTitle u-textCenter">
                    {(editing2 ? (
                        <div>
                            <input type="text"
                                placeholder={value2}
                                onChange={handleChange2}
                            />
                        
                            <button className="Profile-editButton u-pointer" onClick={handleSubmit2}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div>
                            {"Edit Avatar   "}

                            <button className="Profile-editButton u-pointer" onClick={() => setEditing2(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>

                        </div>
                    ))}
                    </h2>
                </div>
                
                
                <div className = "w-[50%] flex justify-around flex-col h-full justify-around items-center">
                
                {/* <hr className="Profile-line" /> */}
                
                <div className="Landing-optionContainer drop-shadow-2xl rounded-xl bg-[#EEEEEE]">
                    <div className="Profile-subContainer u-textCenter">
                    <h1 className="w-full text-center bg-[#615756] text-white text-2xl font-bold py-2 rounded-t-xl">Statistics</h1>
                        {/* <div className="Profile-subContainer u-textCenter"> */}
                            <h4 className="Profile-subTitle">Win Ratio {user.games_won} / {user.games_played}</h4>
                            <h4 className="Profile-subTitle">High score {user.high_score}</h4>
                            <h4 className="Profile-subTitle">Knockouts {user.knockouts}

                            
                            </h4>
                            
                        {/* </div> */}
                    </div>

                
                </div>
                </div>
                <Background2 className="-z-20" direction={"y"} colorX={["#dbedff","#accbff"]} colorY={["#dbedff","#accbff"]}/>


            </div>
        
    );
};

export default Profile;