import React from 'react';

import '../styles/faq.scss';

import Arrow from '../assets/images/corner-down-right (1).svg';
const FAQ = () => {
  return (
    <div className="faq">
      <div className="g-row">
        <div className="faq__box">
          <img className="faq__corner-img" src={Arrow} />
          <h2 className="faq__question">What is this?</h2>
          <p className="faq__answer">
            In lamen's terms, WebRTC allows you to connect with others browser
            to browser. This is cool because this protocol negates the need for
            a server. Welcome to peer-to-peer.
          </p>
          <h1 className="faq__question">Why would I use this?</h1>
          <p className="faq__answer">
            This project was more for learning about WebRTC, WebSocket, and
            working on CSS chops.
          </p>
          <h1 className="faq__question">
            Are you looking for work? How can I contact you?
          </h1>
          <p className="faq__answer">
            Yes. Let's chat,{' '}
            <a href="mailto:jowett.max@gmail.com">jowett.max@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
