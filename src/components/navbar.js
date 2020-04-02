import React from 'react';

import '../styles/navbar.scss';

import Logo from '../assets/images/logo.svg';

const Navbar = () => {
  return (
    <div className="g-row">
      <div className="navbar">
        <div className="navbar__logo">
          <img src={Logo} height="32" />
        </div>
        <div className="navbar__actions">
          <a className="navbar__action" href="#">
            About
          </a>
          <a className="navbar__action" href="#">
            Contact
          </a>
          <a className="navbar__action" href="#">
            FAQ
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
