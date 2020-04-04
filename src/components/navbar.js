import React from 'react';
import { Link } from 'gatsby';

import '../styles/navbar.scss';
import Logo from '../assets/images/logo.svg';

const Navbar = () => {
  return (
    <div className="g-row">
      <div className="navbar">
        <div className="navbar__logo">
          <img src={Logo} height="32" alt="logo" />
        </div>
        <div className="navbar__actions">
          <a className="navbar__action" href="#">
            How it works
          </a>
          <a className="navbar__action" href="#">
            About
          </a>
          <a className="navbar__action" href="#">
            FAQ
          </a>
          <button className="g-button-primary">
            <Link to="/init">Create session</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
