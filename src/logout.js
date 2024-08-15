import React from 'react';
import { useNavigate } from 'react-router-dom';
import './logout.css'; // Import your CSS for styling

const Logout = ({ userData, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout(); // Perform logout (e.g., clear session data)
    navigate('/'); // Redirect to home page
  };

  // Debugging line to check data structure
  console.log('User Data:', userData);

  // Check if userData is valid and extract the relevant data
  const user = userData?.user;
  const userType = userData?.userType;

  if (!user) {
    return <p>No user data available. Please log in.</p>;
  }

  return (
    <div className="logout-container">
      <h2>User Profile</h2>
      <div className="user-data">
        <p><strong>Name:</strong> {user.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        <p><strong>Contact:</strong> {user.contact || 'N/A'}</p>
        <p><strong>Location:</strong> {user.location || 'N/A'}</p>

        {userType === 'petOwner' && (
          <>
            <p><strong>Species:</strong> {user.species || 'N/A'}</p>
            <p><strong>Breed:</strong> {user.breed || 'N/A'}</p>
            <p><strong>Age:</strong> {user.age || 'N/A'}</p>
            <p><strong>Weight:</strong> {user.weight || 'N/A'}</p>
            <p><strong>Medical History:</strong> {user.medicalHistory || 'N/A'}</p>
            <p><strong>Allergies:</strong> {user.allergies || 'N/A'}</p>
            <p><strong>Preferred Food:</strong> {user.preferredFood || 'N/A'}</p>
            <p><strong>Behavior:</strong> {user.behavior || 'N/A'}</p>
            <p><strong>Temperament:</strong> {user.temperament || 'N/A'}</p>
          </>
        )}

        {userType === 'petCareProvider' && (
          <>
            <p><strong>Experience:</strong> {user.experience || 'N/A'}</p>
            <p><strong>Certifications:</strong> {user.certifications || 'N/A'}</p>
            <p><strong>Services Offered:</strong> {user.servicesOffered ? user.servicesOffered.join(', ') : 'N/A'}</p>
            <p><strong>Availability:</strong> {user.availability ? 
              Object.entries(user.availability)
                .filter(([day, available]) => available)
                .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
                .join(', ') 
              : 'N/A'
            }</p>
          </>
        )}
      </div>
      <button onClick={handleLogoutClick} className="logout-button">Logout</button>
    </div>
  );
};

export default Logout;
