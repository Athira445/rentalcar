import React from 'react';

const ContactUs = () => {
    const containerStyle = {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        lineHeight: '1.6',
    };

    const headingStyle = {
        color: '#e63946',
        marginBottom: '15px',
    };

    const textStyle = {
        color: '#333',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Contact Us</h1>
            <p style={textStyle}>
                Need a rental car or have questions? We're here to assist you!  
                Whether you need help with bookings, pricing, or rental policies, our team is ready to help.
            </p>
            <p style={textStyle}>
                📍 Address: 456 Car Rental Avenue, City, Country  
                📞 Phone: +123 987 6543  
                📧 Email: support@carrental.com  
            </p>
            <p style={textStyle}>
                We are committed to providing reliable and affordable car rental services.  
                Drive with confidence—your journey starts here!
            </p>
        </div>
    );
};

export default ContactUs;
