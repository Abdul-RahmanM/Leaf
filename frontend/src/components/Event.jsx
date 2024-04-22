import React from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/Event.css"

function Event({event, onDelete}) {
    const formattedDate = new Date(event.created_at).toLocaleDateString("en-US");

    return <div className="event-container">
        <p className="event-title">{event.title}</p>
        <p className="event-content">{event.content}</p>
        <p className="event-RSVP">{event.RSVP}</p>
        <p className="event-time">{event.event_time}</p>
        <p className="event-date">{formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(event.id)}>Delete</button>
    </div>
}

export default Event