import React, { useEffect, useState } from 'react';
import './UserDetails.css';

const UserDetails = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [error, setError] = useState(''); // State to handle errors

  useEffect(() => {
    // Fetch renters from the backend
    const fetchRenters = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/users'); // Backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch renters');
        }
        const data = await response.json();
        setUsers(data); // Store fetched users in state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRenters();
  }, []);

  // Delete user function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
        const response = await fetch(`http://localhost:4000/api/users/delete/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        alert("User deleted successfully!");
        fetchUsers(); // Refresh the user list
    } catch (error) {
        console.error("Error deleting user:", error.message);
        
    }
};

  
  
  return (
    <div className="user-details">
      <h1>Renters List</h1>
      {error && <p className="error">{error}</p>}
      {users.length === 0 && !error ? (
        <p>No renters available</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDetails;
