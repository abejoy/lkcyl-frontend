import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import './BarNav.css';
import { isAdminPageAvailable } from '../data-service/pi-data-service';

const initialBarNavNames = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Meet the Committee', path: '/committee' },
  { name: 'Football Registration', path: '/football' },
];

const BarNav = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [barNavNames, setBarNavNames] = useState(initialBarNavNames);
  const menuRef = useRef(null); // Reference to the menu container

  const getLinkStyle = (path) => {
    return location.pathname === path ? { color: '#FFA447', fontWeight: 'bold' } : { color: '#ffffff' };
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu
      }
    };

    const addAdminToNavBar = () => {
      if (barNavNames.some((item) => item.name === 'Admin')) return;
      barNavNames.push({ name: 'Admin', path: '/admindash' });
      setBarNavNames(barNavNames);
    };

    const checkIFAdminIsAvaiable = async () => {
      const showAdmin = await isAdminPageAvailable();
      setShowAdminPage(showAdmin);
      showAdmin && addAdminToNavBar();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // For touch events
    checkIFAdminIsAvaiable();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside); // For touch events
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav id="nav-wrap" ref={menuRef}>
      <div className="nav-logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="LKCYL Logo" />
          <span className="logo-text">LKCYL</span>
        </Link>
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <ul id="nav" className={`nav ${isMenuOpen ? 'open' : 'close'}`}>
        {barNavNames.map((item, index) => (
          <Link key={index} to={item.path}>
            <li style={getLinkStyle(item.path)}>{item.name}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default BarNav;
