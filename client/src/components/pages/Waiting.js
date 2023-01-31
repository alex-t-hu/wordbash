import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";


import "../../utilities.css";

const Waiting = (props) => {

    return (
        <div className="w-full h-full flex flex-col">
            <div className="h-[30%] flex justify-center items-center">
                <h1 className="align-middle text-xl">{props.message}</h1>
            </div>
            <div className="flex-grow">

            </div>
        </div>
    );
};
export default Waiting;


