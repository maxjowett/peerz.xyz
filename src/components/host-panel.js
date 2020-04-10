import React from 'react';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import RingLoader from 'react-spinners/RingLoader';
import { FiPlus, FiMinus, FiVolumeX, FiClipboard } from 'react-icons/Fi';

import '../styles/host-panel.scss';

import { formatVolume } from '../utils/volume.js';

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
        onClick={() =>
          setPeerVolume(formatVolume(parseFloat(peerVolume) - 0.2))
        }
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
    return peerVolume < 5 ? (
      <FiPlus
        size={'16px'}
        color={'#999'}
        style={{ verticalAlign: 'middle', cursor: 'pointer' }}
        onClick={() =>
          setPeerVolume(formatVolume(parseFloat(peerVolume) + 0.2))
        }
      />
    ) : (
      <FiPlus
        size={'16px'}
        color={'#555'}
        style={{ verticalAlign: 'middle', cursor: 'pointer' }}
      />
    );
  };

  const handleClipboardClick = () => {
    console.log('Creating link');
    console.log(`localhost:8000/connect/${sessionId}`);
  };

  //TODO: Remove inline css from icons
  return (
    <div className="host-panel">
      <div className="host-panel__left">
        Session ID: {sessionId}{' '}
        <FiClipboard
          onClick={() => {
            handleClipboardClick();
          }}
        />
      </div>
      <div className="host-panel__controls">
        <div className>{renderMinus()}</div>
        <div className="host-panel__controls-mid">
          {parseFloat(peerVolume).toFixed(1)}
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
