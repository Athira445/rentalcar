import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Retrieve the user's name from localStorage
    const [userName, setUserName] = useState(localStorage.getItem("username") || "");

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/cars")
            .then((response) => {
                setCars(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error fetching cars");
                setLoading(false);
            });

        console.log("Retrieved User Name in AllCars:", userName);
    }, []);

    // Handle booking
    const handleBookNow = (car) => {
        navigate("/bookingpages", { state: { car } });
    };

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem("username");
        navigate("/login");
    };

    // Navigate to Profile Page
    const handleProfile = () => {
        navigate("/user-dashboard");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Inline styles
    const containerStyle = {
        padding: "20px",
    };

    const topBarStyle = {
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#f5f5f5",
        color: "#333",
        padding: "15px 20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
    };

    const buttonsContainerStyle = {
        display: "flex",
        gap: "10px",
    };

    const buttonStyle = {
        padding: "8px 12px",
        background: "#e74c3c",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "background-color 0.3s",
    };

    const buttonHoverStyle = {
        background: "#c0392b",
    };

    const cardContainerStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        marginTop: "80px",
    };

    const cardStyle = {
        width: "300px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        backgroundColor: "#fff",
    };

    const imageStyle = {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "8px",
        marginBottom: "10px",
    };

    const bookButtonStyle = {
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    };

    const bookButtonHoverStyle = {
        backgroundColor: "#45a049",
    };

    return (
        <div style={containerStyle}>
            {/* Top Bar with Profile and Logout */}
            <div style={topBarStyle}>
                <h3>{userName}</h3>
                <div style={buttonsContainerStyle}>
                    <button
                        style={buttonStyle}
                        onMouseOver={(e) => (e.target.style.background = buttonHoverStyle.background)}
                        onMouseOut={(e) => (e.target.style.background = buttonStyle.background)}
                        onClick={handleProfile}
                    >
                        Bookings
                    </button>
                    <button
                        style={buttonStyle}
                        onMouseOver={(e) => (e.target.style.background = buttonHoverStyle.background)}
                        onMouseOut={(e) => (e.target.style.background = buttonStyle.background)}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <h2>All Available Cars</h2>
            <div style={cardContainerStyle}>
                {cars.map((car) => (
                    <div key={car._id} style={cardStyle}>
                        <img
                            src={`http://localhost:4000/public/images/${car.imgFile}`}
                            alt={car.name}
                            style={imageStyle}
                        />
                        <h3>{car.name}</h3>
                        <p>{car.brand}</p>
                        <p>Price per Day: ${car.price}</p>
                        <button
                            style={bookButtonStyle}
                            onMouseOver={(e) => (e.target.style.background = bookButtonHoverStyle.backgroundColor)}
                            onMouseOut={(e) => (e.target.style.background = bookButtonStyle.backgroundColor)}
                            onClick={() => handleBookNow(car)}
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCars;
