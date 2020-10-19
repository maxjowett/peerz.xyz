import styles from '../styles/Splash.module.scss';

const Splash = () => {
  return (
      <div className={styles.splash}>
        <div className="g__row">
          <h1 className={styles.splash__header}>P2P video chat, done right</h1>
        </div>
        <div className="g__row">
          <p className={styles.splash__subheader}>
          Video chat should be easy. No account, no server, just browser to
          browser, real time communication via WebRTC.
          </p>
        </div>
        <div className={styles.splash__actions}>
          <div className="g__row">
            <button className="g__button--primary">Create chat</button>
            <button className="g__button--secondary ml-16">Join room</button>
          </div>
        </div>
      </div>
  );
};

export default Splash;
