import React, { useState, useEffect } from 'react';
import axios from "axios"
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Event.css"
import getUserID from "../hooks/getUserID"

function Task({task, onDelete}) {
    const [userId, setUserId] = useState(null); // Which user is accessing the event
    const [attending, setAttending] = useState(false); // Is the user attending the event
    const navigate = useNavigate();

    // Fetch attendance status on component mount
    useEffect(() => {
        checkAttendance();
    }, [event.id]); // Re-run effect when event ID changes


    return (
        <div className="event-container">
            <p className="event-title">{event.title} | {event.author}</p>
            <img className="event-image" src={imageUrl} alt="Event" />
            <h2 className="event-content-title">Description:</h2>
            <p className="event-content">{event.content}</p>
            <p className="event-RSVP">RSVP: {RSVPText}</p>
            <p className="event-time">When: {formattedEventDate}</p>
            <p className="event-date">Posted: {formattedCreatedDate}</p>
            <Button />
        </div>
    );
}

export default Task;
