import React, { useState, useEffect } from 'react';
import axios from "axios"
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Event.css"
import getUserID from "../hooks/getUserID"

function Event({event, onDelete}) {
    const [userId, setUserId] = useState(null); // Declare userId state

    useEffect(() => {
        api.get('api/get_current_user_id/', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const userId = response.data.user_id;
            console.log(userId);
            setUserId(userId); // Set userId state
        })
        .catch(error => console.error('Error:', error));
    }, []); // Empty dependency array to execute once on component mount

    const formattedCreatedDate = new Date(event.created_at).toLocaleDateString("en-US");
    const formattedEventDate = new Date(event.event_time).toLocaleDateString("en-US");

    const imageUrl = event.image && (event.image instanceof File) ?
                     URL.createObjectURL(event.image) :
                     event.image;

    const RSVPText = event.RSVP ? "Required" : "Not Required";

    const Button = () => {
        if (userId !== event.author) { // Check if userId is equal to event.author
            return (
                <div>
                    <button className="attend-button">Attend!</button>
                </div>
            );
        } else {
            return (
                <div>
                    <button className="delete-button" onClick={() => onDelete(event.id)}>Delete</button>
                </div>
            );
        }
    }

    return (
        <div className="event-container">
            <p className="event-title">{event.title}</p>
            <img className="event-image" src={imageUrl} alt="Event" />
            <h2 className="event-content-title">Description:</h2>
            <p className="event-content">{event.content}</p>
            <h2 className="event-RSVP-title">RSVP:</h2>
            <p className="event-RSVP">{RSVPText}</p>
            <h2 className="event-time-title">Event Time:</h2>
            <p className="event-time">{formattedEventDate}</p>
            <p className="event-date">{formattedCreatedDate}</p>
            <Button />
        </div>
    );
}

export default Event;
