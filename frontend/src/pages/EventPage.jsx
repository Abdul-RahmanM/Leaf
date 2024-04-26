import React, { useState, useEffect } from "react";
import api from "../api";
import Event from "../components/Event";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import getUserID from "../hooks/getUserID";
import "../styles/EventPage.css";
import { useNavigate, useLocation } from "react-router-dom";


function EventPage() {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const location = useLocation();

  useEffect(() => {
    getEvents(filters);
  }, [filters]);

  const getEvents = (filters = {}) => {
    filters = { "self_filter": true };
    api
      .get("/api/events/", { params: filters })
      .then((res) => res.data)
      .then((data) => setEvents(data))
      .catch((err) => alert(err));
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  }

  const deleteEvent = (id) => {
    api
      .delete(`/api/events/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Event deleted!");
        else alert("Failed to delete event.");
        getEvents(filters);
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="event-page">

      <Header />
      <Sidebar />
      <div className="content">
        <h1 className="created-title">Created Events</h1>
      </div>
      <div className="content">
              {events.map((event) => (
          <Event event={event} onDelete={deleteEvent} isPreview="false" key={event.id} />

        ))}
      </div>
    </div>
  );
}

export default EventPage;
