import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './myappointments.css';

const History = ({ userData }) => {
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if userData and customerId are defined before making the API call
    if (!userData || !userData.user || !userData.user._id) {
      console.warn('customer ID is undefined or userData is missing, waiting for data...');
      return;
    }

    const fetchBookings = async () => {
      const customerId = userData.user._id;

      console.log('userData:', userData);
      console.log('customerId:', customerId);

      try {
        const response = await axios.get(`https://backendofcarecrew.onrender.com/customer/${customerId}/bookings`);
        const accepted = response.data.filter(booking => booking.status === 'Accepted');
        const rejected = response.data.filter(booking => booking.status === 'Rejected');
        setAcceptedBookings(accepted);
        setRejectedBookings(rejected);
      } catch (err) {
        setError('Error fetching bookings');
        console.error('No bookings:', err);
      }
    };

    fetchBookings();
  }, [userData]); // Dependency array includes userData to run effect when it changes

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
              <p><strong>Customer ID:</strong> {booking.customerId || 'N/A'}</p>
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
              <p><strong>Customer ID:</strong> {booking.customerId || 'N/A'}</p>
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

export default History;
