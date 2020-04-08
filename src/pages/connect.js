import React, { useEffect, useRef } from 'react';
import { navigate } from 'gatsby';
import Peer from 'simple-peer';
import io from 'socket.io-client';

import { createUrl } from '../utils/base-url.js';

const socket = io(createUrl());

const Connect = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const getMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        localVideoRef.current.srcObject = stream;
        handleStream(stream);
      });
  };

  const handleStream = stream => {
    const peer = new Peer({
      initiator: true,
      stream,
      trickle: false,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }
        ]
      }
    });

    socket.on('join-stream', data => {
      console.log(data);
    });

    peer.on('signal', signal => {
      socket.emit('signal', signal);
    });

    socket.on('signal', signal => {
      console.log('I got a response from the joiner!');
      peer.signal(signal);
    });

    peer.on('stream', stream => {
      console.log('I got a stream!');
      remoteVideoRef.current.srcObject = stream;
    });
  };

  useEffect(() => {
    const locationSuccess = location => {
      console.log(location);
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess);
      }
    };

    getLocation();
    // Extract session id from URL
    let url = window.location.href;
    let sessionId = url.split('/').pop();
    socket.emit('join-room', { sessionId });

    socket.on('join-room', data => {
      const { success, error } = data;
      if (!success) {
        navigate('/error');
      }
    });
    getMedia();
  }, []);

  return (
    <div>
      <video ref={localVideoRef} height="180" muted autoPlay />
      <video ref={remoteVideoRef} height="180" autoPlay />
    </div>
  );
};

export default Connect;
