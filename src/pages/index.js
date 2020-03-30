import React, { useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';

const socket = io('http://www.api.peerz.xyz');

const Index = () => {
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
      stream,
      trickle: false,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }
        ]
      }
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
    getMedia();
  }, []);

  return (
    <div>
      <h1>WebRTC</h1>
      <video ref={localVideoRef} height="180" muted autoPlay />
      <video ref={remoteVideoRef} height="180" autoPlay />
    </div>
  );
};

export default Index;
