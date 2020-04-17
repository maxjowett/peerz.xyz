import React, { useState, useEffect, useRef } from 'react';
import { navigate } from 'gatsby';
import Peer from 'simple-peer';
import io from 'socket.io-client';

import { baseUrl } from '../utils/base-url.js';
import { reverseGeocode } from '../utils/geolocation.js';

const socket = io(baseUrl());

const Connect = () => {
  const [city, setCity] = useState('');
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

  //socket.on('location', location => {
  //console.log('I got peer location: ', location);
  //});

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

    socket.on('location', location => {
      console.log('I got peer location: ', location);
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

  const getUserLocation = () => {
    const success = async position => {
      const { latitude, longitude } = position.coords;
      console.log('passing these coords', latitude, longitude);
      let x = await reverseGeocode(latitude, longitude);
      if (x) {
        const { city: c } = x.address;
        setCity(c);
        socket.emit('location', { c });
      }
    };

    const error = () => {
      console.log('Something went wrong!');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  //useEffect(() => {
  //socket.emit('location', { city });
  //}, [city]);

  useEffect(() => {
    getUserLocation();
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
      <video ref={localVideoRef} height="90" muted autoPlay />
      <video ref={remoteVideoRef} height="90" muted autoPlay />
    </div>
  );
};

export default Connect;
