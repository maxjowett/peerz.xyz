import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Draggable from 'react-draggable';

import { baseUrl } from '../utils/base-url.js';
import { reverseGeocode } from '../utils/geolocation.js';

import HostPanel from '../components/host-panel.js';

import '../styles/host.scss';

const hri = require('human-readable-ids').hri;

const socket = io(baseUrl());

const Index = () => {
  const [sessionId, setSessionId] = useState(null);
  const [sessionInvite, setSessionInvite] = useState('');
  const [peerConnected, togglePeerConnected] = useState(false);
  const [city, setCity] = useState('');
  const [peerLocation, setPeerLocation] = useState(null);
  const [peerVolume, setPeerVolume] = useState(0.7);

  let localVideoRef = useRef(null);
  let remoteVideoRef = useRef(null);

  const createSession = () => {
    setSessionId(hri.random());
  };

  const getMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        localVideoRef.current.srcObject = stream;
        handleStream(stream);
      });
  };

  const createPeer = stream => {
    return new Peer({
      stream,
      trickle: false,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }
        ]
      }
    });
  };

  const handleStream = stream => {
    let peer = createPeer(stream);

    //Along with signal, we should attach the user location
    peer.on('signal', signal => {
      console.log('I have some signal');
      socket.emit('signal', signal);
    });

    socket.on('signal', signal => {
      peer.signal(signal);
    });

    socket.on('location', location => {
      console.log('I got location', location);
    });

    peer.on('stream', stream => {
      remoteVideoRef.current.srcObject = stream;
      togglePeerConnected(true);
    });

    peer.on('error', err => {
      if (err) {
        peer.destroy();
        togglePeerConnected(false);
        // Create new peer instance
        peer = createPeer(stream);
        handleStream(stream);
      }
    });
  };

  const createInviteLink = () => {
    let base =
      process.env.NODE_ENV === 'production'
        ? 'https://peerz.xyz'
        : 'localhost:8000';
    return `${base}/connect/${sessionId}`;
  };

  const calculateHeight = () => {
    //Set remote video element to have a height of 0 if no peer is connected
    return peerConnected ? '120' : '0';
  };

  //Move all this code to utils, it should be shared between components

  const getUserLocation = () => {
    const success = async position => {
      const { latitude, longitude } = position.coords;
      console.log('passing these coords', latitude, longitude);
      let x = await reverseGeocode(latitude, longitude);
      if (x) {
        console.log(x);
        const { city: c } = x.address;
        setCity(c);
      }
    };

    const error = () => {
      console.log('Something went wrong!');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  useEffect(() => {
    getUserLocation();
    createSession();
    getMedia();
  }, []);

  useEffect(() => {
    if (city && peerConnected) {
      socket.emit('location', { city });
    }
  }, [city, peerConnected]);

  useEffect(() => {
    //Once session id is created, send the name of the room over the socket
    if (sessionId) {
      socket.emit('create-room', { sessionId });
      setSessionInvite(createInviteLink());
    }
  }, [sessionId]);

  return (
    <div className="host">
      <div />
      <div className="host__cams">
        <div>My location: {city}</div>
        <Draggable position={null} bounds="body">
          <video ref={localVideoRef} height={120} muted autoPlay />
        </Draggable>
        <Draggable position={null} bounds="body">
          <video
            ref={remoteVideoRef}
            id="remoteVideo"
            volume={peerVolume}
            height={calculateHeight()}
            muted
            autoPlay
          />
        </Draggable>
      </div>
      <div className="host__panel">
        <HostPanel
          sessionId={sessionId}
          sessionInvite={sessionInvite}
          peerConnected={peerConnected}
          peerLocation={peerLocation}
          peerVolume={peerVolume}
          setPeerVolume={setPeerVolume}
        />
      </div>
    </div>
  );
};

export default Index;
