"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./UserDetailsPopup.scss";

const UserDetailsPopup = ({ onClose, onSend }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    gali: "",
    nearest: "",
    homeNumber: "",
    city: "",
    contact1: "",
    contact2: "",
  });

  const handleChange = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  const handleSend = () => {
    const requiredFields = ["name", "address", "gali", "nearest", "homeNumber", "city", "contact1"];
    for (let field of requiredFields) {
      if (!userDetails[field]) {
        alert("Please fill all required fields");
        return;
      }
    }
    onSend(userDetails);
  };

  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Enter Your Details</h2>
        <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
          {Object.keys(userDetails).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              onChange={handleChange}
              required={key !== "contact2"}
            />
          ))}

          <div className="popup-buttons">
            <button type="button" onClick={handleSend}>Send to WhatsApp</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default UserDetailsPopup;
