import React from 'react';

import '../styles/footer.scss';

import Logo from '../assets/images/logo.svg';

const Footer = () => {
  return (
    <div className="footer">
      <div className="g-row">
        <div className="footer__container">
          <div className="footer__logo">
            <img src={Logo} height="96" />
          </div>
          <div className="footer__contact">
            <h1 className="footer__header">Get in touch</h1>
            <div>
              <p>
                <a
                  className="footer__text footer__email"
                  href="mailto:jowett.max@gmail.com">
                  jowett.max@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="footer__colophon">
            <h1 className="footer__header">Colophon</h1>
            <p className="footer__text">
              Peerz was built with React, WebRTC, Node.js, socket.io, hosted on
              Netlify and running on a Digital Ocean droplet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
