import styles from '../styles/Info.module.scss';

const Info = () => {
  return (
    <div className="g__row">
      <div className={styles.info}>
        <div className={styles.info__left}>
          <h3 className="pl-16">What is WebRTC?</h3>
        </div>
        <div className={styles.info__right}>
          <div className={styles.info__right_container}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
