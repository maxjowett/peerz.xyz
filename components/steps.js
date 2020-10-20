import styles from '../styles/Steps.module.scss';

const Steps = () => {
  return (
    <div className={styles.steps}>
      <div className="g__row">
        <h3 className="mt-0">How it works</h3>
      </div>
      <div className="g__row">
        <div className={styles.steps__list}>
          <div className={styles.steps__step}>
            <img src="/assets/icons8-webcam-64.png" height="64" />
            <h4>Create session</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className={styles.steps__step}>
            <img src="/assets/icons8-ethernet-on-64.png" height="64" />
            <h4>Realtime connection</h4>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className={styles.steps__step}>
            <img src="/assets/icons8-checkmark-64.png" height="64" />
            <h4>That was painless</h4>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
