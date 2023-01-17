import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    /*useEffect(() => {
        const checkUser = () => {
            if (!localStorage.getItem("username")) {
                navigate("/");
            }
        };
        checkUser();
    }, [navigate]);*/

    const handleSignOut = () => {
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <div className='dashboard'>
        <div className='card'>
            <h2 style={{ marginBottom: "30px" }}>Hey Mr. / Mrs. </h2>
            <h3 style={{ marginTop: "30px" }}>{localStorage.getItem("username")}</h3>
            <button className='signOutBtn' onClick={handleSignOut}>
                SIGN OUT
            </button>
        </div>

        </div>
    );
};

export default Dashboard;
