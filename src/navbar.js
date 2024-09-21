import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';

function Navbar({ isLoggedIn, userData, userType, handleLogout }) {
  const [isSticky, setIsSticky] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    handleLogout(); // This will only run when the user clicks logout
    navigate('/');
  };

  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="navbar-container">
        <Link to="/">
          <h1 className="navbar-brand">CareCrew</h1>
        </Link>
        <div 
          className={`menu-icon ${isMenuOpen ? 'menu-icon-active' : ''}`} 
          onClick={toggleMenu}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {isLoggedIn && userType === 'petCareProvider' ? (
            <li><Link to="/manageservices">Manage Services</Link></li>
          ) : (
            <li><Link to="/services">Services</Link></li>
          )}
          {isLoggedIn && userType === 'petCareProvider' ? (
            <li><Link to="/appointments">My Appointments</Link></li>
          ) : isLoggedIn && userType === 'petOwner' ? (
            <li><Link to="/history">History</Link></li>
          ) : null}
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About Us</Link></li>
          {isLoggedIn ? (
            <li><Link to="/logout">Profile</Link></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
