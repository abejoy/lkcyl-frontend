import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./BarNav.css";

const BarNav = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkStyle = (path) => {
    return location.pathname === path
      ? { color: "#FFA447", fontWeight: "bold" }
      : {};
  };

  return (
    <nav id="nav-wrap">
      <div className="nav-logo">
        <Link to="/" className="logo-link" onClick={() => setIsMenuOpen(false)}>
          <img src={logo} alt="LKCYL Logo" />
          <span className="logo-text">LKCYL</span>
        </Link>
      </div>

      <button
        className="hamburger"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </button>

      <ul id="nav" className={`nav ${isMenuOpen ? "show" : ""}`}>
        {/* <li>
          <Link to="/" style={getLinkStyle("/")} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li> */}
        <li>
          <Link to="/gallery" style={getLinkStyle("/gallery")} onClick={() => setIsMenuOpen(false)}>
            Gallery
          </Link>
        </li>
        <li>
          <Link to="/football" style={getLinkStyle("/football")} onClick={() => setIsMenuOpen(false)}>
            Football Registration
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BarNav;
