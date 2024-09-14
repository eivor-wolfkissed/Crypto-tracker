import React from "react";
import "./styles.css"
import TemporaryDrawer from "./Drawer"
import Button from "../Common/Button"
import { Link } from "@mui/material";

function Header () {
    return(
        <div className="navbar ">
            <Link to= "/#">
            <h1 className="logo">
                CryptoTracker<span style={{color: "var(--blue)"}}>.</span>
            </h1>
            </Link>
            <div className="links">
                <Link href="/#">
                    <p className="links">Home</p>
                </Link>
                <Link href="/compare">
                    <p className="links">Compare</p>
                </Link>
                <a href="/dashboard">
                <p className="links">Dashboard</p>
                </a>
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