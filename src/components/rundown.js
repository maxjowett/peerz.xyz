import React from 'react';

import '../styles/rundown.scss';

import Link from '../assets/images/link.svg';
import Unlock from '../assets/images/unlock.svg';
import Video from '../assets/images/video.svg';

const Rundown = () => {
  return (
    <div className="rundown">
      <div className="g-row">
        <h1 className="rundown__header">The rundown</h1>
        <div className="rundown__step-container">
          <div className="rundown__step" id="step01">
            <img className="rundown__step_img" src={Link} />
            <h1 className="rundown__step_header">Create a session</h1>
            <p className="rundown__step_details">
              Creating a session will generate a unique session ID you can send
              to a friend.
            </p>
          </div>
          <div className="rundown__step" id="step02">
            <img className="rundown__step_img" src={Unlock} />
            <h1 className="rundown__step_header">Grant permissions</h1>
            <p className="rundown__step_details">
              In order to use WebRTC, your browser will need your permission to
              access your webcam, audio, and location.
            </p>
          </div>
          <div className="rundown__step" id="step03">
            <img className="rundown__step_img" src={Video} />
            <h1 className="rundown__step_header">Chat away</h1>
            <p className="rundown__step_details">
              Once your friend joins, you're now connected through WebRTC,
              browser to browser, no server involved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rundown;
