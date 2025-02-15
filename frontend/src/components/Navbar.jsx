import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(false); // Default to `false` to show Login/Register initially

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-44 cursor-pointer"
        src="logos.png"
        alt="Logo"
      />
      
      {/* Navigation Links */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to="/testimonials">
          <li className="py-1">TESTIMONIALS</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
        </NavLink>
        <NavLink to="/blog">
          <li className="py-1">BLOG</li>
        </NavLink>
      </ul>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative group cursor-pointer">
            {/* Profile Dropdown */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate('/my-profile')}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/my-booking')}
                  className="hover:text-black cursor-pointer"
                >
                  My Booking
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* Login Button */}
            <button
              onClick={() => navigate('/login')}
              className="bg-primary text-white px-6 py-2 rounded-full font-light"
            >
              Login
            </button>
             {/* Login Button */}
             
            {/* Register Button */}
            <button
              onClick={() => navigate('/register')}
              className="bg-primary text-white border border-primary px-6 py-2 rounded-full font-light"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
