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
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
    closeMenu(); // Close the menu on logout
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
            <li><Link to="/manageservices" onClick={closeMenu}>Manage Services</Link></li>
          ) : (
            <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
          )}
          {isLoggedIn && userType === 'petCareProvider' ? (
            <li><Link to="/appointments" onClick={closeMenu}>My Appointments</Link></li>
          ) : isLoggedIn && userType === 'petOwner' ? (
            <li><Link to="/history" onClick={closeMenu}>History</Link></li>
          ) : null}
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
          {isLoggedIn ? (
            <li><Link to="/logout" onClick={handleLogoutClick}>Profile</Link></li>
          ) : (
            <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
