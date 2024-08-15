import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './history.css';

const History = ({ userData }) => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      // Check if userData is available and contains user ID
      if (!userData || !userData.user || !userData.user._id) {
        console.warn('Customer ID is undefined, waiting for data...');
      
        return;
      }

      const customerId = userData.user._id;
      console.log('Customer ID:', customerId); // Debugging line

      try {
        const response = await axios.get(`https://backendofcarecrew.onrender.com/customer/${customerId}/bookings`);
        setBookings(response.data);
      } catch (err) {
        setError('Error fetching bookings');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false); // Stop loading in both success and error cases
      }
    };

    fetchBookings();
  }, [userData]); // Depend on userData to rerun the effect when it changes

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while data is being fetched
  }

  if (!userData || !userData.user || !userData.user._id) {
    return <p>No customer data available.</p>; // Inform the user if no data is available
  }

  const categorizedBookings = {
    Accepted: bookings.filter(booking => booking.status === 'Accepted'),
    Rejected: bookings.filter(booking => booking.status === 'Rejected'),
    Pending: bookings.filter(booking => booking.status === 'Pending'),
  };

  return (
    <div className="history-container">
      <h2>Booking History</h2>
      {error && <p className="error">{error}</p>}

      <div className="booking-list">
        <h3>Accepted Bookings</h3>
        {categorizedBookings.Accepted.length > 0 ? (
          categorizedBookings.Accepted.map(booking => (
            <div key={booking._id} className="booking-block">
              <h4>Service: {booking.service}</h4>
              <p><strong>Provider ID:</strong> {booking.providerId}</p>
              <p><strong>Days:</strong> {booking.days?.join(', ') || 'N/A'}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))
        ) : (
          <p>No accepted bookings found.</p>
        )}

        <h3>Rejected Bookings</h3>
        {categorizedBookings.Rejected.length > 0 ? (
          categorizedBookings.Rejected.map(booking => (
            <div key={booking._id} className="booking-block">
              <h4>Service: {booking.service}</h4>
              <p><strong>Provider ID:</strong> {booking.providerId}</p>
              <p><strong>Days:</strong> {booking.days?.join(', ') || 'N/A'}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))
        ) : (
          <p>No rejected bookings found.</p>
        )}

        <h3>Pending Bookings</h3>
        {categorizedBookings.Pending.length > 0 ? (
          categorizedBookings.Pending.map(booking => (
            <div key={booking._id} className="booking-block">
              <h4>Service: {booking.service}</h4>
              <p><strong>Provider ID:</strong> {booking.providerId}</p>
              <p><strong>Days:</strong> {booking.days?.join(', ') || 'N/A'}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </div>
          ))
        ) : (
          <p>No pending bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default History;
