import React, { useState, useEffect } from 'react';
import axios from "axios"
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Event.css"
import getUserID from "../hooks/getUserID"

function Event({event, onDelete}) {
    const [userId, setUserId] = useState(null); // Which user is accessing the event
    const [attending, setAttending] = useState(false); // Is the user attending the event
    const navigate = useNavigate();

    // Function to check attendance
    const checkAttendance = async () => {
        try {
            const response = await api.get(`api/events/is-attending/${event.id}/`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            });
            setAttending(response.data.attending);
        } catch (error) {
            console.error('Error fetching attendance status:', error);
        }
    };

    // Fetch attendance status on component mount
    useEffect(() => {
        checkAttendance();
    }, [event.id]); // Re-run effect when event ID changes

    // Format dates for display with time
    const formattedCreatedDate = new Date(event.created_at).toLocaleString("en-US", {
        dateStyle: 'medium',
        timeStyle: 'short'
    });
    const formattedEventDate = new Date(event.event_time).toLocaleString("en-US", {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    // Format image for preview
    const imageUrl = event.image && (event.image instanceof File) ?
                     URL.createObjectURL(event.image) :
                     event.image;

    // Format RSVP text for display
    const RSVPText = event.RSVP ? "Required" : "Not Required";

    // Attending button should toggle whether or not they are attending and update the backend to reflect that
    const attendButton = (e) => {
        e.stopPropagation(); // Stop propagation of the click event (stops from going to EventDetails after click)
        api.patch(`api/events/toggle-attendance/${event.id}/`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const attending = response.data.attending;
            console.log('attending: ' + attending);
            checkAttendance(); // Check and Set attendance
        })
        .catch(error => console.error('Error:', error));
    };

    // Redirect to EventDetail page
    const detailRedirect = (e) => {
        navigate(`/eventDetails/${event.id}`)
    }

    // Format Attending Button text for display
    const attendButtonText = attending ? "Cancel Attendance!" : "Attend!";

    const Button = () => {
        if (localStorage.getItem('USER_ID') != event.author) { // Check if userId is not equal to event.author
            return (
                <div onClick={(e) => e.stopPropagation()}>
                    <button onClick={(e) => attendButton(e)}className="attend-button">{attendButtonText}</button>
                </div>
            );
        } else {
            localStorage.getItem('USER_ID')
            return (
                <div onClick={(e) => e.stopPropagation()}>
                    <button className="delete-button" onClick={(e) => onDelete(event.id)}>Delete</button>
                </div>
            );
        }
    }

    return (
        <div onClick={detailRedirect} className="event-container">
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

export default Event;
