import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './history.css';

const History = ({ userData }) => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const customerId = userData?.user?._id; // Retrieve providerId from userData

      if (!customerId) {
        console.warn('Provider ID is undefined, waiting for data...');
        return; // Don't fetch until providerId is available
      }

      try {
        console.log('Fetching bookings for provider ID:', customerId);
        const response = await axios.get(`https://backendofcarecrew.onrender.com/customer/${customerId}/bookings`);
        console.log('Bookings response:', response.data);
        // Filter bookings with status 'Pending'
        const pendingBookings = response.data.filter(booking => booking.status === 'Pending');
        setBookings(pendingBookings);
      } catch (err) {
        setError('No Available Bookings');
        console.error('No Available Bookings:', err);
      }
    };

    fetchBookings();
  }, [userData]);

  const handleAction = async (bookingId, action) => {
    try {
      await axios.patch(`https://backendofcarecrew.onrender.com/booking/${bookingId}`, { status: action });
      setBookings(prevBookings => prevBookings.map(booking =>
        booking._id === bookingId ? { ...booking, status: action } : booking
      ).filter(booking => booking.status === 'Pending')); // Ensure only pending bookings are shown
    } catch (err) {
      alert('Error updating booking status');
      console.error('Error updating booking status:', err);
    }
  };

  return (
    <div className="manage-services-container">
      <h2>Manage Booking Requests</h2>
      {error && <p className="error">{error}</p>}
      <div className="bookings-list">
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <div key={booking._id} className="booking-block">
              <h3>Service: {booking.service}</h3>
              <p><strong>Customer ID:</strong> {booking.customerId?._id}</p> {/* Assuming customerId is populated */}
              <p><strong>Days:</strong> {booking.days?.join(', ') || 'N/A'}</p> {/* Display days if available */}
              <p><strong>Status:</strong> {booking.status}</p>
              <button onClick={() => handleAction(booking._id, 'Accepted')}>Accept</button>
              <button onClick={() => handleAction(booking._id, 'Rejected')}>Reject</button>
            </div>
          ))
        ) : (
          <p>No booking requests found.</p>
        )}
      </div>
    </div>
  );
};

export default History;
