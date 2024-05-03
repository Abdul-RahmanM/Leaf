import React, { useState, useEffect } from "react";
import api from "../api";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DatePicker from "react-datepicker";
import Event from "../components/Event";
import parseEventDetailsFromPrompt from "../hooks/parseEventDetailsFromPrompt";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Create.css";

function Create() {
  const location = useLocation();
  const { eventDetailsFromPrompt, isEditing, event } = location.state || {};
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [RSVP, setRSVP] = useState(false);
  const [eventTime, setEventTime] = useState(new Date()); // Initialize with current date and time
  const [image, setImage] = useState(null);

  // Load the data from AI prompt for first loading
  useEffect(() => {
  if (eventDetailsFromPrompt) {
    console.log("TRUE");
    const eventDetails = parseEventDetailsFromPrompt(eventDetailsFromPrompt);
    setTitle(eventDetails.Title);
    setContent(eventDetails.Description);
    setEventTime(new Date(eventDetails.DateTime));
  }

  // Load existing event data because editing
  if (isEditing) {
    setTitle(event.title);
    console.log("image", event.image);
    setImage(event.image);
    setContent(event.content);
    setEventTime(new Date(event.event_time));
    setRSVP(event.RSVP);
  }
  }, []);


  const handleSubmission = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("RSVP", RSVP);
    formData.append("event_time", eventTime.toISOString());

    if (image instanceof File) {
      formData.append("image", image);
    }

    if (isEditing) {
        api.patch(`/api/events/${event.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          if (res.status === 200 || res.status === 204) {
            alert("Event Edited successfully");
            // You may want to redirect or perform other actions upon successful creation
          } else {
            alert("Failed to edit event");
          }
        })
        .catch(err => alert(err));
    } else {
        api.post("/api/events/", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          if (res.status === 201) {
            alert("Event created");
            // You may want to redirect or perform other actions upon successful creation
          } else {
            alert("Failed to make event");
          }
        })
        .catch(err => alert(err));
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  // Preview component
    const Preview = () => {
      const previewData = {
        title: title,
        content: content,
        RSVP: RSVP,
        event_time: typeof eventTime === 'string' ? eventTime : eventTime.toISOString(),
        image: image
      };
      return (
        <div>
          <Event event={previewData} />
        </div>
      );
    };

  return (
    <div className="event-page">
      <Header />
      <Sidebar />
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="create-column">
              <h2>Event Creation</h2>
              <form className="event-form" onSubmit={handleSubmission}>
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
                <label htmlFor="image">Thumbnail Image:</label>
                <br />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <br />
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
                <label htmlFor="RSVP">RSVP:</label>
                <br />
                <input
                  type="checkbox"
                  id="RSVP"
                  name="RSVP"
                  onChange={(e) => setRSVP(e.target.checked)}
                  checked={RSVP}
                />
                <br />
                <label htmlFor="event_time">Event Time:</label>
                <br />
                <DatePicker
                  selected={eventTime}
                  onChange={(date) => setEventTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                />
                <br />
                <button className="event-button" type="submit">
                  Submit
                </button>
              </form>
            </div>
            <div className="preview-column">
              <h2>Preview</h2>
              <Preview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
