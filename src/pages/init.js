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
      console.log('I got a response from the joiner!');
      peer.signal(signal);
    });

    peer.on('stream', stream => {
      console.log('I got a stream!');
      console.log(remoteVideoRef);
      remoteVideoRef.current.srcObject = stream;
      debugger;
      //Hand down this state to display whether a peer is currently connected
      togglePeerConnected(true);
    });

    peer.on('error', err => {
      console.log('Peer connection was closed');
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

  useEffect(() => {
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
