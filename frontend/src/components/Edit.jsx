import React, { useState, useEffect } from 'react';
import axios from "axios"
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Edit.css"
import getUserID from "../hooks/getUserID"

function Edit({ event, isOwner }) {
  const [eventCollaborators, setEventCollaborators] = useState([]); // State for collaborators
  const navigate = useNavigate();

  // Collaborator button logic
  const editButton = (e) => {
    e.stopPropagation();
    // Navigate to Create page but for editing
    navigate("../../eventCreate/", { state: { isEditing: true, event: event} })
  };

  if (!isOwner) {
    return null;
  }

  return (
    <div>
        <button onClick={editButton} className="edit-button">Edit</button>
    </div>
  );
}
export default Edit;
