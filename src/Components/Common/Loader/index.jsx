import { LinearProgress } from "@mui/material";
import React from "react";
import "./styles.css";
function Loader() {
    return (
        <div className="loader-background">
        <LinearProgress />
        </div>
    );
}

export default Loader;



