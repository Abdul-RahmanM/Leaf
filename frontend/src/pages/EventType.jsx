import React, { useState, useEffect } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate, useLocation } from "react-router-dom";
import Event from "../components/Event";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/EventType.css";

function EventType() {
  const [prompt, setPrompt] = useState("")
  const [eventDetails, setEventDetails] = useState("")
  const public_redirect = "/eventCreate"
  const navigate = useNavigate();

  function submitPrompt() {
    console.log("submitPrompt", prompt)
    // Make the API call using the imported api module
    api.post('api/events/GeminiPrompt/', { prompt: prompt }, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    })
    .then(response => {
        // Handle successful response
        setEventDetails(response.data)
        console.log('Response from server:', response.data.response);
        navigate("/eventCreate", { state: { eventDetailsFromPrompt: response.data.response } });
    })
    .catch(error => {
        // Handle error
        console.error('Error making API call:', error);
        // Optionally, display an error message to the user
    });
  }

  return (
  <div>
    <Sidebar />
    <Header />
    <h1 className="title">Choose Event Type</h1>
    <div className="listing-option">
        <a href={public_redirect} className="option-link">
            <div className="option-content">
                <i className="icon-public"></i>
                <div className="option-details">
                    <div className="option-title">Create Manually</div>
                    <div className="option-description">Create an event manually</div>
                </div>
            </div>
        </a>
    </div>
    <div className="listing-option">
        <div className="option-link">
            <div className="option-content">
                <i className="icon-private"></i>
                <div className="option-details">
                    <div className="option-title">Create From Prompt</div>
                        <input type="text" id="promptInput" onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your prompt here"/>
                    <button onClick={submitPrompt} >Submit</button>
                </div>
            </div>
        </div>
    </div>
  </div>


  );
}

export default EventType;

