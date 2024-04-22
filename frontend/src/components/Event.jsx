import React from 'react';

//import "../styles/Event.css"

function Event({event, onDelete}) {
    const formattedDate = new Date(event.created_at).toLocaleDateString("en-US");

    return <div className="note-container">
        <p className="note-title">{event.title}</p>
        <p className="note-content">{event.content}</p>
        <p className="note-RSVP">{event.RSVP}</p>
        <p className="note-time">{event.event_time}</p>
        <p className="note-date">{formattedDate}</p>
        <button className="delete-button" onClick={() => onDelete(event.id)}>Delete</button>
    </div>
}

export default Event