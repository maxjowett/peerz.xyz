import React from 'react';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';

import '../styles/host-panel.scss';

const override = css`
  display: inline-block;
  margin: 0 auto;
  vertical-align: text-top;
  padding-right: 12px;
`;

const HostPanel = props => {
  const { sessionId } = props;
  return (
    <div className="host-panel">
      <div className="host-panel__left">Session ID: {sessionId}</div>
      <div className="host-panel__right">
        <ScaleLoader
          css={override}
          height={12}
          width={1}
          radius={2}
          margin={1}
          color={'orange'}
        />
        Waiting for connections
      </div>
    </div>
  );
};

export default HostPanel;
