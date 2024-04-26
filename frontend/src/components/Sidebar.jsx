import React from 'react';
import "../styles/Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // To determine the current route


    const createEvent = () => {
        navigate("/eventType");
    };
    const viewYourEvents = () => {
        navigate("/yourEvents");
    };

    const viewEvents = () => {
        navigate("/eventPage");
    };

    // Default sidebar content
    return (
        <div className="sidebar">
            <ul className="navigation">
                <li><button className="sidebar-button" onClick={viewEvents}>Explore</button></li>
                <li><button className="sidebar-button" onClick={viewYourEvents}>Your Events</button></li>
                <li><button className="sidebar-create-button" onClick={createEvent}>Create</button></li>
            </ul>
        </div>
    );
}

export default Sidebar;
