import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Signup from "./Signup";

const Navbar = () => {
    const navigate = useNavigate();
    return(
        <div className="navbar">
            <div className="logo">

            </div>
            <ul className="nav-items">
                <li>
                    <Link to="/">Login</Link>
                </li>
                <li>
                    <Link to="/register">Signup</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
