import React, { useState, useEffect } from "react";
import api from "../api";
import Event from "../components/Event";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/EventType.css";

function EventType() {
  const [events, setEvents] = useState([]);
  const public_redirect = "/eventCreate"
  const private_redirect = "/eventCreate"

  return (
  <div>
    <Sidebar />
    <Header />
    <h1 className="title">Choose Event Type</h1>
    <div className="listing-option">
        <a href={public_redirect} className="option-link">
            <div className="option-content">
                <i className="icon-public"></i>
                <div className="option-details">
                    <div className="option-title">Public Event</div>
                    <div className="option-description">Create an event that is visible to everyone on the platform.</div>
                </div>
            </div>
        </a>
    </div>
    <div className="listing-option">
        <a href={private_redirect} className="option-link">
            <div className="option-content">
                <i className="icon-private"></i>
                <div className="option-details">
                    <div className="option-title">Private Event</div>
                    <div className="option-description">Create an event that is only visible to invited members.</div>
                </div>
            </div>
        </a>
    </div>
  </div>


  );
}

export default EventType;

