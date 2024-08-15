import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import Login from './login-logout';
import Signup from './signup';
import HomeData from './homedata';
import Logout from './logout';
import Contact from './contact';
import Services from './Services';
import Review from './review';
import About from './about';
import ManageServices from './ManageServices';
import History from './history';
import MyAppointments from './MyAppointments';
// import PaymentPage from './PaymentPage';



function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState('');

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserData(user);
    setUserType(user.userType);
    localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
  };

  const handleSignup = (user) => {
    setIsLoggedIn(true);
    setUserData(user);
    setUserType(user.userType);
    localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setUserType('');
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  // Load user data from localStorage if available
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsLoggedIn(true);
      setUserData(storedUser);
      setUserType(storedUser.userType);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} userData={userData} userType={userType} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomeData />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services userData={userData} />} />
        <Route path="/review" element={<Review />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History userData={userData} />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/logout" element={<Logout isLoggedIn={isLoggedIn} userData={userData} onLogout={handleLogout} />} />
        <Route path="/manageservices" element={<ManageServices userData={userData} />} />
        <Route path="/appointments" element={<MyAppointments userData={userData} />} />
        {/* <Route path="/payment" element={<PaymentPage userData={userData}/>} /> */}
      </Routes>
    </Router>
  );
}

export default HomePage;
