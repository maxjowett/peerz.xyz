import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Draggable from 'react-draggable';

import { createUrl } from '../utils/base-url.js';

import HostPanel from '../components/host-panel.js';

import '../styles/host.scss';

//Gross ES5 import
const hri = require('human-readable-ids').hri;

const socket = io(createUrl());

const Index = () => {
  const [sessionId, setSessionId] = useState(null);
  const [peerConnected, togglePeerConnected] = useState(false);
  const [peerLocation, setPeerLocation] = useState(null);
  let localVideoRef = useRef(null);
  let remoteVideoRef = useRef(null);
  let localCanvasRef = useRef(null);

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
      console.log('I got a response from the joiner!');
      peer.signal(signal);
    });

    peer.on('stream', stream => {
      console.log('I got a stream!');
      remoteVideoRef.current.srcObject = stream;
      togglePeerConnected(true);
    });

    peer.on('error', err => {
      console.log('Peer connection was closed');
      if (err) {
        peer.destroy();
        // Create new peer instance
        peer = createPeer(stream);
        handleStream(stream);
      }
    });
  };

  useEffect(() => {
    createSession();
    getMedia();
  }, []);

  useEffect(() => {
    //Once session id is created, send the name of the room over the socket
    if (sessionId) {
      socket.emit('create-room', { sessionId });
    }
  }, [sessionId]);

  return (
    <div className="host">
      <div />
      <div className="host__cams">
        <Draggable position={null} bounds="body">
          <video ref={localVideoRef} height="180" muted autoPlay />
        </Draggable>
        <Draggable position={null} bounds="body">
          <video ref={remoteVideoRef} height={180} autoPlay />
        </Draggable>
      </div>
      <div className="host__panel">
        <HostPanel
          sessionId={sessionId}
          peerConnected={peerConnected}
          peerLocation={peerLocation}
        />
      </div>
    </div>
  );
};

export default Index;
