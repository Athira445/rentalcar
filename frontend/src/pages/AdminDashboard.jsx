import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const location = useLocation();
  
  // State for dashboard metrics
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalCars, setTotalCars] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // Fetch total bookings
    axios.get('http://localhost:4000/api/payments')
      .then((response) => {
        setTotalBookings(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });

    // Fetch total cars
    axios.get('http://localhost:4000/api/cars')
      .then((response) => {
        setTotalCars(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });

    // Fetch total users
    axios.get('http://localhost:4000/api/users')
      .then((response) => {
        setTotalUsers(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <nav className="dashboard-nav">
          <ul>
            <li><Link to="/admin-dashboard/add-car">Add Car</Link></li>
            <li><Link to="/admin-dashboard/view-cars">View Cars</Link></li>
            <li><Link to="/admin-dashboard/users">Userdetails</Link></li>
            <li><Link to="/admin-dashboard/booked">Bookings</Link></li>
      
            <li><Link to="/">Logout</Link></li>
          </ul>
        </nav>
      </header>

      {/* Dashboard overview cards are displayed only on the main admin dashboard page */}
      
      {location.pathname === "/admin-dashboard" && (
        <div className="dashboard-content">
          <div className="cards-container">
            <div className="dashboard-card">
              <h3>Total Bookings</h3>
              <p>{totalBookings}</p>
            </div>
            <div className="dashboard-card">
              <h3>Total Cars</h3>
              <p>{totalCars}</p>
            </div>
            <div className="dashboard-card">
              <h3>Total Users</h3>
              <p>{totalUsers}</p>
            </div>
          </div>
          
        </div>
      )}

      <main className="dashboard-content">
        <Outlet /> {/* Renders nested route components */}
      </main>
    </div>
  );
};

export default AdminDashboard;
