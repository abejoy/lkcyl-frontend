import React, { useState } from "react";

const BarNav = (props) => {

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
      <li className="current">
        <a className="smoothscroll" href="/">Home</a>
      </li>
      <li>
        <a className="smoothscroll" href="/contact">Football Tournament Registration</a>
      </li>
    </ul>
  </nav>
  </>
  );
};

export default BarNav;
