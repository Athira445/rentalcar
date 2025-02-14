import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout action (clear tokens, session data, etc.)
    // Example: localStorage.removeItem('authToken');
    // Example: sessionStorage.removeItem('user');
    
    // Redirect to homepage after logout
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;
