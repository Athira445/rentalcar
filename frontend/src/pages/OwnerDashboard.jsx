import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom'; // Import useLocation to access current route
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const location = useLocation(); // Get current location/path

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Owner Dashboard</h1>
        <nav className="dashboard-nav">
          <ul>
            <li><Link to="/owner-dashboard/add-car">Add Car</Link></li>
            <li><Link to="/owner-dashboard/view-cars">View My Cars</Link></li>
            <li><Link to="/owner-dashboard/bookings">My Bookings</Link></li>
            
            <li><Link to="/">Logout</Link></li>
          </ul>
        </nav>
      </header>

      {/* Conditionally render the sentence based on the path */}
      {location.pathname === "/owner-dashboard" && (
        <div className="dashboard-content">
          <p>Welcome to your Owner Dashboard! Manage your cars, bookings, and earnings here.</p>
        </div>
      )}

      <main className="dashboard-content">
        <Outlet /> {/* Renders nested route component */}
      </main>
    </div>
  );
};

export default OwnerDashboard;
