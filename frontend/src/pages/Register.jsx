import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for redirection
import axios from 'axios'; // Import axios
import "./register.css"; // Link to the CSS file

const Register = () => {
  const [userType, setUserType] = useState("renters"); // Default to family member
  const navigate = useNavigate(); // Create a navigate function for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: document.querySelector('input[placeholder="Enter your username"]').value,
      email: document.querySelector('input[placeholder="Enter your email"]').value,
      password: document.querySelector('input[placeholder="Enter your password"]').value,
      userType,
    };

    try {
      // Use axios to send the POST request
      const response = await axios.post("http://localhost:4000/register", formData, {
        headers: { "Content-Type": "application/json" }
      });

      // Check if the response is successful
      if (response.status === 201) {
        // Successful registration
        alert("Registration successful!");
        navigate("/login"); // Redirect to login page after successful registration
      }
    } catch (error) {
      // If an error occurs during the request, handle it here
      if (error.response) {
        // If there's an error response from the backend (e.g., 400, 500)
        alert(error.response.data.message || "Registration failed");
      } else {
        // For network errors or no response from server
        alert("Something went wrong! Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-heading">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label"></label>
            <select
              className="form-select"
              onChange={(e) => setUserType(e.target.value)}
              value={userType}
              required
            >
              <option value="owner">Owner</option>
              <option value="renters">renters</option>
            </select>
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">LOGIN</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
