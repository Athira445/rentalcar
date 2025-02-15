import React from 'react';

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col md:flex-row justify-between gap-14 my-10 mt-40 text-sm">
        {/* ------- Left Section ------- */}
        <div className="flex-1">
        <img className="mb-5 w-40" src="logos.png" alt="Cardeal Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Cardeal is an online platform designed to make car rentals easy and
            convenient. Whether you're planning a road trip, need a vehicle for
            business, or require a car for special events, Cardeal offers a wide
            selection of vehicles to meet your needs.
          </p>
        </div>

        {/* ------- Center Section ------- */}
        <div className="flex-1">
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* ------- Right Section ------- */}
        <div className="flex-1">
          <p className="text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>cardeal@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 @ Cardeal - ALL RIGHTS RESERVED
        </p>
      </div>
    </div>
  );
};

export default Footer;
