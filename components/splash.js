import styles from '../styles/Splash.module.scss';

const Splash = () => {
  return (
    <div className="g__row--full-bleed">
      <div className={styles.splash}>
        <div className="g__row">
          <h1 className={styles.splash__header}>P2P video chat, done right</h1>
        </div>
        <div className="g__row">
          Video chat should be easy. No account, no server, just browser to browser, real time communication via WebRTC.
          <button className="g__button--primary">Create chat</button>
        </div>
      </div>
    </div>
  );
};

export default Splash;
