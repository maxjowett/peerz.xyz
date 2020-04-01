import React from 'react';

import '../styles/hero.scss';

const Hero = () => {
  return (
    <div className="hero">
      <div className="g-row">
        <div className="hero__header">
          <h1>P2P video chat, done right</h1>
        </div>
        <div className="hero__subheader">
          <p>Peer to peer, real time communication, the way it should be.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
