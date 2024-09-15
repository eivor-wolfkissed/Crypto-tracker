import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton, Switch } from "@mui/material";
import { Link } from "react-router-dom";

export default function TemporaryDrawer() {
    const [open, setOpen] = useState(false);
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
        <div>
            <IconButton onClick={() => setOpen(true)}>
                <MenuRoundedIcon className="link" />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <div className="drawer-div">
                    <Link to="/">
                        <p className="link">Home</p>
                    </Link>
                    <Link to="/compare">
                        <p className="link">Compare</p>
                    </Link>
                    <Link to="/dashboard">
                        <p className="link">Dashboard</p>
                    </Link>
                    {/* Dark Mode Toggle */}
                    <div style={{ marginTop: '1rem' }}>
                        <p className="link">{darkMode ? "Dark Mode" : "Light Mode"}</p>
                        <Switch checked={darkMode} onChange={changeMode} />
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
