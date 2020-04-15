import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Draggable from 'react-draggable';

import { baseUrl } from '../utils/base-url.js';

import HostPanel from '../components/host-panel.js';

import '../styles/host.scss';

const hri = require('human-readable-ids').hri;

const socket = io(baseUrl());

const Index = () => {
  const [sessionId, setSessionId] = useState(null);
  const [sessionInvite, setSessionInvite] = useState('');
  const [peerConnected, togglePeerConnected] = useState(false);
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

    peer.on('signal', signal => {
      socket.emit('signal', signal);
    });

    socket.on('signal', signal => {
      peer.signal(signal);
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
    return peerConnected ? '180' : '0';
  };

  const getUserLocation = () => {
    const reverseGeocode = (lat, lon) => {
      fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=75232b95ff1a41&lat=${lat}&lon=${lon}&format=json`
      )
        .then(res => res.json())
        .then(resp => {
          //If the peer location is valid, set statw in order to display it to the other peer
          const { city } = resp.address;
          city ? setPeerLocation(city) : setPeerLocation();
        });
    };

    const success = position => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      reverseGeocode(latitude, longitude);
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
        <Draggable position={null} bounds="body">
          <video ref={localVideoRef} height={120} muted autoPlay />
        </Draggable>
        <Draggable position={null} bounds="body">
          <video
            ref={remoteVideoRef}
            id="remoteVideo"
            volume={peerVolume}
            height={calculateHeight()}
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
