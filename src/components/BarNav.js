import React from "react";
import { Link, useLocation } from "react-router-dom";

const BarNav = (props) => {
  const location = useLocation(); // Get the current route

  // Function to determine the active style
  const getLinkStyle = (path) => {
    return location.pathname === path ? { color: "yellow", fontWeight: "bold" } : {};
  };

  return (
    <>
    <nav id="nav-wrap">
    <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
      Show navigation
    </a>
    <a className="mobile-btn" href="#home" title="Hide navigation">
      Hide navigation
    </a>

    <ul id="nav" className="nav">
      <li>
      <Link to="/" style={getLinkStyle("/")} >Home</Link>
      </li>
      <li>
      <Link to="/gallery" style={getLinkStyle("/gallery")}>Gallery</Link>
      </li>
      <li>
      <Link to="/football" style={getLinkStyle("/football")}>Football Registration</Link>
      </li>
    </ul>
  </nav>
  </>
  );
};

export default BarNav;
