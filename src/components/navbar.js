import React from 'react';
import { Link, navigate } from 'gatsby';

import '../styles/navbar.scss';
import Logo from '../assets/images/logo.svg';

const Navbar = () => {
  const onClick = () => {
    navigate('/test-route/');
  };

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
          <button
            className="navbar__create-session g-button-primary"
            onClick={onClick}>
            //<Link to="/init">Create session</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
