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
    const backgroundStyle = (reverse, direction, color1, color2) => ({
        animationDirection: reverse && `alternate-reverse`,
        animationDuration: `4s`,
        backgroundImage: `linear-gradient(${direction==="y" ? '0deg' : '90deg'}, ${color1} 50%, ${color2} 50%)`,
    });
    return (
        <>
            {/* <div className="bg"></div> */}
            {/* <div className={`${props.direction==="x" ? "bgX" : "bgY"}`} style={backgroundStyle(false, props.direction, props.color1, props.color2)}></div>
            <div className={`${props.direction==="x" ? "bgX" : "bgY"}`} style={backgroundStyle(true, props.direction, props.color1, props.color2)}></div> */}
            <div className="bgX" style={backgroundStyle(false, "x", props.colorX[0], props.colorX[1])}></div>
            <div className="bgX" style={backgroundStyle(true, "x", props.colorX[0], props.colorX[1])}></div>
            <div className="bgY" style={backgroundStyle(false, "y", props.colorY[0], props.colorY[1])}></div>
            <div className="bgY" style={backgroundStyle(true, "y", props.colorY[0], props.colorY[1])}></div>
            {/* <div class="content">
            <h1>Sliding Diagonals Background Effect</h1>
            </div> */}
        </>
    );
};
export default Background2;


