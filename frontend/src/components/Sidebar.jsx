import React from 'react';
import "../styles/Sidebar.css"
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const viewEvents = () => {
        navigate("/eventPage");
    }

    return (
        <div className="sidebar">
            <ul className="navigation">
                <li><button className="sidebar-button">Explore</button></li>
                <li><button className="sidebar-button" onClick={viewEvents}>Events</button></li>
            </ul>
        </div>
    );
}

export default Sidebar;
