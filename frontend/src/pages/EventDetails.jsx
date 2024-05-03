import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import api from '../api';
import Event from "../components/Event";
import Edit from "../components/Edit"
import Collaboration from "../components/Collaboration"
import "../styles/EventDetails.css"

function EventDetails() {
  const params = useParams();
  const id = params.eventId;
  const [event, setEvent] = useState(null);
  const [filters, setFilters] = useState({});
  const [eventCollaborators, setEventCollaborators] = useState([]);
  const [attending, setAttending] = useState(false); // Is the user attending the event

  useEffect(() => {
    console.log("ID", id)
    getEvent(filters);
    checkAttendance();
  }, [filters]);

    // Function to check attendance
    const checkAttendance = async () => {
        try {
            const response = await api.get(`api/events/is-attending/${id}/`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            });
            setAttending(response.data.attending);
        } catch (error) {
            console.error('Error fetching attendance status:', error);
        }
    };


  const getEvent = (filters = {}) => {
    filters = { "event_id": id};
    api
      .get("/api/events/", { params: filters })
      .then((res) => res.data)
      .then((data) => setEvent(data[0]))
      .catch((err) => alert(err));
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  }


  if (!event) {
    return <div>Loading...</div>;
  }

    const formattedCreatedDate = new Date(event.created_at).toLocaleString("en-US", {
        dateStyle: 'medium',
        timeStyle: 'short'
    });
    const formattedEventDate = new Date(event.event_time).toLocaleString("en-US", {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    const imageUrl = event.image && (event.image instanceof File) ?
                     URL.createObjectURL(event.image) :
                     event.image;

    const RSVPText = event.RSVP ? "Required" : "Not Required";

    // Attend Button Logic
    const attendButton = (e) => {
        e.stopPropagation(); // Stop propagation of the click event (stops from going to EventDetails after click)
        api.patch(`api/events/toggle-attendance/${id}/`, {
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
    // Format Attending Button text for display
    const attendButtonText = attending ? "Cancel Attendance!" : "Attend!";
    const isOwner = localStorage.getItem('USER_ID') == event.author

    const Button = () => {
        if (!isOwner) { // Check if userId is not equal to event.author
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
        <div className="HUD">
            <Sidebar />
            <Header />
            <div className="event-detail-container">
                <p className="event-detail-title">{event.title} | {event.author}</p>
                <img className="event-detail-image" src={event.image} alt="Event" />
                <h2 className="event-detail-content-title">Description:</h2>
                <p className="event-detail-content">{event.content}</p>
                <h2 className="event-detail-RSVP-title">RSVP:</h2>
                <p className="event-detail-RSVP">{RSVPText}</p>
                <h2 className="event-detail-time-title">Event Time:</h2>
                <p className="event-detail-time">{formattedEventDate}</p>
                <p className="event-detail-date">Posted: {formattedCreatedDate}</p>
                <div className="button-container">
                  <Button />
                  <Edit event={event} isOwner={isOwner} />
                </div>
                <Collaboration event={event} isOwner={isOwner} />

            </div>
        </div>

    );

}

export default EventDetails;
