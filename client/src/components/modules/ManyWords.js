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
    const [wordPositions, setWordPositions] = useState([]);

    useEffect(() => {
        let t = [];
        for (let i = 0; i < 10; i++) {
            t.push([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]);
        }
        setWordPositions(t);
    }, []);

    let listItems = wordPositions.map((position) =>
        <FloatingWord x={position[0]} y={position[1]} color={"red"} word={"helooooooo"}/>
    );

    return (
        <>
            {listItems}
        </>
    );
}

export default ManyWords;
