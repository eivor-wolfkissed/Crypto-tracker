import React, {useState,useEffect} from "react";
import "./styles.css";
import TemporaryDrawer from "./Drawer";
import Button from "../Common/Button";
import { Link } from "react-router-dom"; 
import { Switch } from "@mui/material";

function Header() {

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark" ? true : false
    );

    useEffect(() => {
        if (localStorage.getItem("theme") === "dark") {
            setDark();
        } else {
            setLight();
        }
    }, []);

    const changeMode = () => {
        if (darkMode) {
            setLight();
        } else {
            setDark();
        }
        setDarkMode(!darkMode);
    };

    const setDark = () => {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
    };

    const setLight = () => {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
    };

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

            <div style={{ marginLeft: '0' }} className="switch">
    <Switch checked={darkMode} onChange={changeMode} />
</div>


            <div className="mobile-drawer">
                <TemporaryDrawer />
            </div>
        </div>
    );
}

export default Header;
