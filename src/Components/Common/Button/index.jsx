import React from "react";
import "./styles.css"

function Button ({text, onClick, oulined}) {
    return <div className={oulined ? "outlined-btn" : "btn"} 
    onClick={() => onClick()}>{text}</div>
}

export default Button