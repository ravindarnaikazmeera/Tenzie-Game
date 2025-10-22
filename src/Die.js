import React from "react";
// import App from "./App";

export default function Die(props){

    const styleOnClick = {
        backgroundColor : props.isHeld ? "#59E391" : "white"
    }
    return(
        
        <div 
        className="die-face" 
        style={styleOnClick}
        onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
        
    )
}