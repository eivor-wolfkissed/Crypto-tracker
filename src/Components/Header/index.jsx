import React from "react";
import "./styles.css";
import TemporaryDrawer from "./Drawer";
import Button from "../Common/Button";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Header() {
    return (
        <div className="navbar">
            <Link to="/">
                <h1 className="logo">
                    CryptoTracker<span style={{ color: "var(--blue)" }}>.</span>
                </h1>
            </Link>
            <div className="links">
                <Link to="/" className="link">
                    <p className="links">Home</p>
                </Link>
                <Link to="/compare" className="link">
                    <p className="links">Compare</p>
                </Link>
                <Link to="/dashboard" className="link">
                    <p className="links">Dashboard</p>
                </Link>
                <Link to="/dashboard">
                    <Button
                        text={"Share"}
                        outlined={true}
                        onClick={() => console.log("Btn Clicked")}
                    />
                </Link>
            </div>
            <div className="mobile-drawer">
                <TemporaryDrawer />
            </div>
        </div>
    );
}

export default Header;
