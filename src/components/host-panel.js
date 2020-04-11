import React from 'react';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import RingLoader from 'react-spinners/RingLoader';
import { baseUrl } from '../utils/base-url.js';
import { FiPlus, FiMinus, FiVolumeX, FiClipboard } from 'react-icons/Fi';

import '../styles/host-panel.scss';

//TODO: Figure out how to better handle this grid alignment issue
const override = css`
  display: inline-block;
  margin: 0 auto;
  vertical-align: middle;
  padding-right: 8px;
`;

const override2 = css`
  display: inline-block;
  margin: 0 auto;
  vertical-align: inherit;
  padding-right: 8px;
`;

const HostPanel = props => {
  const {
    sessionId,
    peerConnected,
    peerLocation,
    peerVolume,
    setPeerVolume
  } = props;

  const renderMinus = () => {
    return peerVolume > 0 ? (
      <FiMinus
        size={'16px'}
        color={'#999'}
        style={{ verticalAlign: 'middle', cursor: 'pointer' }}
        onClick={decreaseVolume}
      />
    ) : (
      <FiMinus
        size={'16px'}
        color={'#555'}
        style={{ verticalAlign: 'middle', cursor: 'pointer' }}
      />
    );
  };

  const renderPlus = () => {
    return peerVolume < 1 ? (
      <FiPlus
        size={'16px'}
        color={'#999'}
        style={{ verticalAlign: 'middle', cursor: 'pointer' }}
        onClick={increaseVolume}
      />
    ) : (
      <FiPlus
        size={'16px'}
        color={'#555'}
        style={{ verticalAlign: 'middle', cursor: 'pointer' }}
      />
    );
  };

  const createInviteLink = () => {
    let base =
      process.env.NODE_ENV === 'production'
        ? 'https://peerz.xyz'
        : 'localhost:8000';
    return `${base}/connect/${sessionId}`;
  };

  const handleClipboardClick = () => {
    console.log('Creating link');
    console.log(`localhost:8000/connect/${sessionId}`);
  };

  const increaseVolume = () => {
    if (peerVolume < 1) {
      let adjusted = parseFloat(peerVolume) + parseFloat(0.1);
      setPeerVolume(adjusted.toFixed(1));
    }
  };

  const decreaseVolume = () => {
    if (peerVolume > 0) {
      let adjusted = parseFloat(peerVolume) - parseFloat(0.1);
      setPeerVolume(adjusted.toFixed(1));
    }
  };

  const scaleVolume = v => {
    let vol = parseFloat(v * 5);
    return vol.toFixed(1);
  };

  //TODO: Remove inline css from icons
  return (
    <div className="host-panel">
      <div className="host-panel__left">
        <span className="host-panel__invite">
          {createInviteLink()}{' '}
          <FiClipboard
            css={override}
            style={{ verticalAlign: 'middle', cursor: 'pointer' }}
            onClick={() => {
              //TODO: Automatically copy session invite link to user's clipboard
              handleClipboardClick();
            }}
          />
        </span>
      </div>
      <div className="host-panel__controls">
        <div className>{renderMinus()}</div>
        <div className="host-panel__controls-mid">
          {scaleVolume(peerVolume)}
        </div>
        <div>{renderPlus()}</div>
      </div>
      <div className="host-panel__right">
        {!peerConnected ? (
          <>
            <ScaleLoader
              css={override}
              height={12}
              width={1}
              radius={2}
              margin={1}
              color={'orange'}
            />
            Waiting for connections
          </>
        ) : (
          <>
            <RingLoader css={override2} size={12} color={'orange'} />1 active
            peer connection
          </>
        )}
      </div>
    </div>
  );
};

export default HostPanel;
