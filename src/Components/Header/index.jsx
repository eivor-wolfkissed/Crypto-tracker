import React from "react";
import "./styles.css"
import TemporaryDrawer from "./Drawer"
import Button from "../Common/Button"
import { Link } from "@mui/material";

function Header () {
    return(
        <div className="navbar ">
            <h1 className="logo">
                CryptoTracker<span style={{color: "var(--blue)"}}>.</span>
            </h1>
            <div className="links">
                <Link to ="#">
                    <p className="links">Home</p>
                </Link>
                <Link to ="/compare">
                    <p className="links">Compare</p>
                </Link>
                <Link to ="/">
                    <p className="links">Watchlist</p>
                </Link>
                <Link to ="/dashboard">
                    <Button text = {"Share"} 
                    oulined={true}
                    onClick = {() => console.log("Btn Clicked")}/>
                </Link>
            </div>
            <div className="mobile-drawer">
                <TemporaryDrawer />
            </div>
        </div>
    )
}

export default Header