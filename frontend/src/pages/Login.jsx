import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from 'jwt-decode';

 // Import jwt-decode to extract userId
import "./login.css";

const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        setMessage("Login successful! Redirecting...");

        const token = response.data.user.token;
        localStorage.setItem("token", token); // Store token

        // Decode token to extract userId and userType
        const decodedToken = jwtDecode(token);
        localStorage.setItem("userId", decodedToken.userId);
        localStorage.setItem("userType", decodedToken.userType);

        console.log("Stored User ID:", localStorage.getItem("userId"));

        // Redirect based on userType
        if (decodedToken.userType === "admin") {
          navigate("/admin-dashboard");
        } else if (decodedToken.userType === "owner") {
          navigate("/owner-dashboard");
        } else if (decodedToken.userType === "renters") {
          navigate("/all-cars");
        }
      } else {
        setMessage(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-heading">Welcome Back</h2>
        <p className="login-subheading">Log in to continue</p>
        {message && <p className="login-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
