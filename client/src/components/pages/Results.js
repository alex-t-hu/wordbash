import React, { useEffect } from "react";

import "./Landing.css";
import "../../utilities.css"
import { useState } from "react";

import { get, post } from "../../utilities";


const Results = (props) => {

    if (!props.userId) {
        return <div>Please Log in</div>;
    }
    
    return (
        <div>
            
        </div>
    );
    

};

export default Results;
