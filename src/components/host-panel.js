import React from 'react';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import RingLoader from 'react-spinners/RingLoader';
import { FiPlus, FiMinus, FiVolumeX } from 'react-icons/Fi';

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

  return (
    <div className="host-panel">
      <div className="host-panel__left">Session ID: {sessionId}</div>
      <div className="host-panel__controls">
        <div className="host-panel__controls-volume">
          {peerVolume > 0 ? (
            <FiMinus
              size={'16px'}
              color={'#999'}
              style={{ verticalAlign: 'middle', cursor: 'pointer' }}
              onClick={() =>
                setPeerVolume(formatVolume(parseFloat(peerVolume) - 0.5))
              }
            />
          ) : (
            <FiMinus
              size={'16px'}
              color={'#555'}
              style={{ verticalAlign: 'middle', cursor: 'pointer' }}
            />
          )}
        </div>
        <div className="host-panel__controls-mid">
          {parseFloat(peerVolume).toFixed(1)}
        </div>
        <div>
          {peerVolume < 5 ? (
            <FiPlus
              size={'16px'}
              color={'#999'}
              style={{ verticalAlign: 'middle', cursor: 'pointer' }}
              onClick={() =>
                setPeerVolume(formatVolume(parseFloat(peerVolume) + 0.5))
              }
            />
          ) : (
            <FiPlus
              size={'16px'}
              color={'#555'}
              style={{ verticalAlign: 'middle', cursor: 'pointer' }}
            />
          )}
        </div>
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
