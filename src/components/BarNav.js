import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./BarNav.css";

const BarNav = () => {
  const location = useLocation();

  const getLinkStyle = (path) => {
    return location.pathname === path
      ? { color: "#FFA447", fontWeight: "bold" }
      : {};
  };

  return (
    <nav id="nav-wrap">
      <div className="nav-logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="LKCYL Logo" />
          <span className="logo-text">LKCYL</span>
        </Link>
      </div>

      <ul id="nav" className="nav">
        {/* <li>
          <Link to="/" style={getLinkStyle("/")}>Home</Link>
        </li> */}
        <li>
          <Link to="/gallery" style={getLinkStyle("/gallery")}>Gallery</Link>
        </li>
        <li>
          <Link to="/football" style={getLinkStyle("/football")}>Football Registration</Link>
        </li>
      </ul>
    </nav>
  );
};

export default BarNav;
