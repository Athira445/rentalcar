import React, { useState, useEffect } from "react";
import axios from "axios";
import MyBooking from "./MyBooking"; // Import MyBooking Component
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function UserDashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/users"); // Adjust API URL
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    // Logout handler
    const handleLogout = () => {
        navigate("/all-cars");
    };

    // Inline styles
    const dashboardStyle = {
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
    };

    const contentStyle = {
        flex: 1,
        padding: "20px",
        backgroundColor: "#ecf0f1",
    };

    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    };

    const mainHeadingStyle = {
        fontSize: "24px",
        color: "#2c3e50",
    };

    const logoutButtonStyle = {
        padding: "10px 20px",
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    };

    const logoutButtonHoverStyle = {
        backgroundColor: "#c0392b",
    };

    return (
        <div style={dashboardStyle}>
            {/* Main Content */}
            <div style={contentStyle}>
                <div style={headerStyle}>
                    <h2 style={mainHeadingStyle}>My Bookings</h2>
                    <button
                        style={logoutButtonStyle}
                        onMouseOver={(e) => (e.target.style.background = logoutButtonHoverStyle.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.background = logoutButtonStyle.backgroundColor)}
                        onClick={handleLogout}
                    >
                        Back
                    </button>
                </div>
                <MyBooking />
            </div>
        </div>
    );
}

export default UserDashboard;
