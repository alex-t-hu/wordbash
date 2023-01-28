import React, { useState, useEffect } from "react";
import FloatingWord from "./FloatingWord.js";

import "./ManyWords.css";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {UserObject[]} users to display
 * @param {string} userId id of current logged in user
 */
const ManyWords = (props) => {
    const [wordPositions, setWordPositions] = useState([[10, 10]]);

    useEffect(() => {
        let t = [];
        for (let i = 0; i < 5; i++) {
            t.push([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]);
        }
        setWordPositions(t);
    });

    return (
        <>
            <FloatingWord x={wordPositions[0][0]} y={wordPositions[0][1]} color={"red"} word={"helooooooo"}/>
        </>
    );
}

export default ManyWords;
