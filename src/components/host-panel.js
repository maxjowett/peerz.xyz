import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';
import RingLoader from 'react-spinners/RingLoader';
import {
  FiPlus,
  FiMinus,
  FiVolumeX,
  FiClipboard,
  FiCheck
} from 'react-icons/Fi';

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
  const [copySuccess, toggleCopySuccess] = useState(false);

  const {
    sessionId,
    sessionInvite,
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

  const renderInviteBlock = () => {
    // When the user loads the page, the link is visible, once that link is clicked,
    // temporarily toggle the contents of the block to display a success message
    return copySuccess ? (
      <>
        <FiCheck
          css={override}
          color={'80f52c'}
          style={{ verticalAlign: 'middle' }}
        />{' '}
        An invite link was copied to your clipboard!
      </>
    ) : (
      <CopyToClipboard text={sessionInvite}>
        <span
          onClick={() => toggleCopySuccess(true)}
          style={{ cursor: 'pointer' }}>
          <FiClipboard
            css={override}
            style={{ verticalAlign: 'middle', cursor: 'pointer' }}
            onClick={() => toggleCopySuccess(true)}
          />{' '}
          {sessionInvite}
        </span>
      </CopyToClipboard>
    );
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

  useEffect(() => {
    setTimeout(() => {
      toggleCopySuccess(false);
    }, 4000);
  }, [copySuccess]);

  //TODO: Remove inline css from icons
  return (
    <div className="host-panel">
      <div className="host-panel__left">
        <span className="host-panel__invite">{renderInviteBlock()}</span>
      </div>
      <div className="host-panel__controls">
        <div>{renderMinus()}</div>
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
