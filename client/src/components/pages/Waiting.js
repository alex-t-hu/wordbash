import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import ReactLoading from "react-loading";
import { TypeAnimation } from "react-type-animation";

import "../../utilities.css";

const Waiting = (props) => {

    return (
        <div className="w-full h-full flex flex-col">
            <div className="h-[40%] h-full flex justify-center">
                <div className="w-[60%] flex justify-center text-center items-center">
                    <TypeAnimation
                        sequence={[
                            props.message,
                            5000,
                            '',
                            1000
                        ]}
                        wrapper="div"
                        cursor={true}
                        repeat={Infinity}
                        speed="70"
                        className={`align-middle ${props.bigScreen ? "text-4xl" : "text-xl" }`}
                        deletionSpeed="70"
                    />
                </div>
            </div>
            <div className="flex-grow flex justify-center">
                <ReactLoading type={"bars"} color="#000" width={"15%"} height={"15%"}/>
            </div>
        </div>
    );
};
export default Waiting;


