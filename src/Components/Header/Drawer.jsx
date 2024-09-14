import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton, Switch } from "@mui/material";
//import { toast } from "react-toastify"; // Uncomment if you are using this
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
        toast.success("Theme Changed!"); // Ensure toast notifications are working
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
                    <Link to="/watchlist">
                        <p className="link">Watchlist</p>
                    </Link>
                    <Link to="/dashboard">
                        <p className="link">Dashboard</p>
                    </Link>
                    {/* Dark Mode Toggle */}
                    <div style={{ marginTop: '1rem' }}>
                        <p className="link">Dark Mode</p>
                        <Switch checked={darkMode} onChange={changeMode} />
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
