import React, { useState, useEffect } from "react";
import api from "../api";
import Event from "../components/Event"; // Renamed Event component
import "../styles/Home.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function EventPage() {
  const [events, setEvents] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [RSVP, setRSVP] = useState([]);
  const [event_time, setEventTime] = useState("");

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    api
      .get("/api/events/")
      .then((res) => res.data)
      .then((data) => setEvents(data))
      .catch((err) => alert(err));
  };

  const createEvent = (e) => {
    e.preventDefault();
    api
      .post("/api/events/", { content, title, RSVP, event_time })
      .then((res) => {
        if (res.status === 201) alert("event created");
        else alert("failed to make event");
        getEvents();
      })
      .catch((err) => alert(err));
  };

  const deleteEvent = (id) => {
    api
      .delete(`/api/events/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Event deleted!");
        else alert("Failed to delete event.");
        getEvents();
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
        <div>
            <Sidebar />
            <Header />
        </div>
      <div>
        <h2>Events</h2>
        {events.map((event) => (
          <Event event={event} onDelete={deleteEvent} key={event.id} /> // Changed Event to EventItem
        ))}
      </div>
      <h2>Create an Event</h2>
      <form onSubmit={createEvent}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <br />
        <label htmlFor="content">RSVP:</label>
        <input
          type="boolean"
          id="RSVP"
          name="RSVP"
          required
          onChange={(e) => setRSVP(e.target.value)}
          value={RSVP}
        />
        <br />
        <label htmlFor="content">Event Time:</label>
        <input
          type="text"
          id="event_time"
          name="event_time"
          required
          onChange={(e) => setEventTime(e.target.value)}
          value={event_time}
        />
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default EventPage;