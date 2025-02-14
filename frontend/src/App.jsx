import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AddCar from './components/Addcar'; // Import AddCar component
import ViewCars from './components/ViewCars'; // Import ViewCars component
import AllCars from './pages/AllCars';
import BookingPage from './pages/BookingPage';
import ViewBooking from './components/ViewBooking';
import UserDetails from './components/UserDetails';
import Bookingview from './components/Bookingview';
import Payment from './pages/Payment';
import MyBooking from './pages/MyBooking';

// Import Stripe components
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import UserDashboard from './pages/Userdashboard';
import BookingDetails from './pages/BookingDetails';



// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51QkHUQEiMZSJFTQm88nKdCoQW7MnQoLfSPt50oztqNQWW6X1Y1wE3PdjracB3kr9XyDvPBTGeX52VxKGoURvhP0s00Bwwg8DTj'); // Replace with your Stripe publishable key

const App = () => {
  const location = useLocation();

  // Define routes where header and footer should be hidden (owner and admin dashboards, and AddCar page)
  const noHeaderFooterRoutes = [
    "/owner-dashboard",
    "/admin-dashboard",
    "/owner-dashboard/add-car",
    "/owner-dashboard/view-cars",
    "/owner-dashboard/bookings",
    "/admin-dashboard/add-car",
    "/admin-dashboard/view-cars",
    "/admin-dashboard/users",
    "/admin-dashboard/booked",
    "/user-dashboard",
    "/all-cars"
  ];

  // Check if current route is one of the dashboard routes or AddCar
  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className='mx-4 sm:mx-[10%]'>
      {/* Show Navbar and Footer only on pages that are not dashboards or AddCar */}
      {shouldShowHeaderFooter && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        
        {/* Wrap the Payment route with Elements provider */}
        <Route path="/payment" element={
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        } />

        <Route path="/bookingpages" element={<BookingPage />} />
        <Route path="/mybooking" element={<MyBooking />} />
        <Route path="/booking-details" element={<BookingDetails />} />
        
        
        {/* Owner Dashboard */}
        <Route path="/owner-dashboard" element={<OwnerDashboard />}>
          <Route path="add-car" element={<AddCar />} /> {/* AddCar page */}
          <Route path="view-cars" element={<ViewCars />} />
          <Route path="bookings" element={<ViewBooking />} /> {/* ViewCars page */}
        </Route>

        <Route path="/all-cars" element={<AllCars />} />

        <Route path="/user-dashboard" element={<UserDashboard />}/>


        {/* Admin Dashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="add-car" element={<AddCar />} /> {/* AddCar page */}
          <Route path="view-cars" element={<ViewCars />} /> {/* ViewCars page */}
          <Route path="users" element={<UserDetails />} /> {/* ViewCars page */}
          <Route path="booked" element={<Bookingview />} /> {/* ViewCars page */}
        </Route>
      </Routes>

      {shouldShowHeaderFooter && <Footer />}
    </div>
  );
};

export default App;
