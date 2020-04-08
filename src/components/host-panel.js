import React from 'react';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import RingLoader from 'react-spinners/RingLoader';

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
  const { sessionId, peerConnected, peerLocation } = props;

  return (
    <div className="host-panel">
      <div className="host-panel__left">Session ID: {sessionId}</div>
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
