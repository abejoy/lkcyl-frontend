import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./BarNav.css";

const barNavNames = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: 'Meet the Committee', path: '/committee'},
  { name: "Football Registration", path: "/football" },
];



const BarNav = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const getLinkStyle = (path) => {
    return location.pathname === path
      ? { color: "#FFA447", fontWeight: "bold" }
      : {};
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav id="nav-wrap">
      <div className="nav-logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="LKCYL Logo" />
          <span className="logo-text">LKCYL</span>
        </Link>
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <ul id="nav" className={`nav ${isMenuOpen ? "open" : "close"}`}>
        {barNavNames.map((item, index) => (
          <li key={index}>
            <Link to={item.path} style={getLinkStyle(item.path)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BarNav;
