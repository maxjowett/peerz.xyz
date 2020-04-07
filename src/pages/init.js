import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import Draggable from 'react-draggable';

import { createUrl } from '../utils/base-url.js';

//Gross ES5 import
const hri = require('human-readable-ids').hri;

const socket = io(createUrl());

const Index = () => {
  const [sessionId, setSessionId] = useState(null);
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
      console.log('I got a response from the joiner!');
      peer.signal(signal);
    });

    peer.on('stream', stream => {
      console.log('I got a stream!');
      remoteVideoRef.current.srcObject = stream;
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
    <div>
      <h1>WebRTC</h1>
      <h2>Session id: {sessionId}</h2>
      <Draggable position={null} bounds="body">
        <video ref={localVideoRef} height="180" muted autoPlay />
      </Draggable>
      <Draggable position={null} bounds="body">
        <video ref={remoteVideoRef} height="180" autoPlay />
      </Draggable>
    </div>
  );
};

export default Index;
