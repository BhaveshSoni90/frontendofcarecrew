import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './myappointments.css';

const MyAppointments = ({ userData }) => {
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const providerId = userData?.user?._id;

      if (!providerId) {
        console.warn('Provider ID is undefined, waiting for data...');
        return;
      }

      try {
        const response = await axios.get(`https://backendofcarecrew.onrender.com/${providerId}/bookings`);
        const accepted = response.data.filter(booking => booking.status === 'Accepted');
        const rejected = response.data.filter(booking => booking.status === 'Rejected');
        setAcceptedBookings(accepted);
        setRejectedBookings(rejected);
      } catch (err) {
        setError('Error fetching bookings');
        console.error('no bookings:', err);
      }
    };

    fetchBookings();
  }, [userData]);

  return (
    <div className="my-appointments-container">
      <h2>My Appointments</h2>
      {error && <p className="error">{error}</p>}
      
      <div className="appointments-list">
        <h3>Accepted Bookings</h3>
        {acceptedBookings.length > 0 ? (
          acceptedBookings.map(booking => (
            <div key={booking._id} className="booking-block">
              <h4>Service: {booking.service}</h4>
              <p><strong>Customer ID:</strong> {booking.customerId}</p>
              <p><strong>Days:</strong> {booking.days?.join(', ') || 'N/A'}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))
        ) : (
          <p>No accepted bookings found.</p>
        )}
        
        <h3>Rejected Bookings</h3>
        {rejectedBookings.length > 0 ? (
          rejectedBookings.map(booking => (
            <div key={booking._id} className="booking-block">
              <h4>Service: {booking.service}</h4>
              <p><strong>Customer ID:</strong> {booking.customerId}</p>
              <p><strong>Days:</strong> {booking.days?.join(', ') || 'N/A'}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))
        ) : (
          <p>No rejected bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
