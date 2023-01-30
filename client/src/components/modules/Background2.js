import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";


import "../../utilities.css";
import "./Background2.css"


import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


/**
 * Define the "App" component
 */
const Background2 = (props) => {
    return (
        <>
            {/* <div className="bg"></div> */}
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <div className="bg bg4"></div>
            <div className="bg bg5"></div>
            {/* <div class="content">
            <h1>Sliding Diagonals Background Effect</h1>
            </div> */}
        </>
    );
};
export default Background2;


