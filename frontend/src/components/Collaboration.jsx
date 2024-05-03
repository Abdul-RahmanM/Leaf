import React, { useState, useEffect } from 'react';
import axios from "axios"
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Event.css"
import getUserID from "../hooks/getUserID"

function Collaboration({ event, isOwner }) {
  const [eventCollaborators, setEventCollaborators] = useState([]); // State for collaborators

  // Collaborator button logic
  const collaboratorButton = (e) => {
    e.stopPropagation();
    // Use the updatedCollaborators state here
    api
      .patch(`api/events/add-collaborator/${event.id}/`, { collaborators: eventCollaborators })
      .then(response => {
        alert(response.data.response);
      })
      .catch(error => console.error('Error:', error));
  };

  if (!isOwner) {
    return null;
  }

  return (
    <div className="collaboration-container">
      <input
        type="text"
        id="username"
        onChange={(e) => setEventCollaborators(e.target.value)}
        placeholder="Insert Username"
      />
      <button onClick={collaboratorButton}>Add Collaborator</button>
        <p className="event-collaborators">
          Collaborators:
          {event.collaborators.map(collaborator => (
            <div key={collaborator.id}>{collaborator.username}</div>
          ))}
        </p>
    </div>
  );
}
export default Collaboration;
