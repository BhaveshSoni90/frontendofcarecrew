// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login({ onLogin }) {
  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userType) {
      setError('Please select a user type');
      return;
    }
  
    console.log('Sending request with data:', { userType, email: username, password });
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userType, email: username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        onLogin({ user: data.user, userType }); // Pass userType to the onLogin callback
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Server error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="text"
            value={username}
            placeholder='enter your email'
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder='enter your password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="user-type-selection">
            <label>User Type:</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="petOwner"
                  checked={userType === 'petOwner'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Pet Owner
              </label>
              <label>
                <input
                  type="radio"
                  value="petCareProvider"
                  checked={userType === 'petCareProvider'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Pet Care Provider
              </label>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
