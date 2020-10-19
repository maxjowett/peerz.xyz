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
              WebRTC is a framework which enables the exchange of data, such as
              audio and video, directly between internet browsers. Typically
              this transfer of data would require a server, Instead, the WebRTC
              protocol allow this exchange to occur without an intermediary
              server.{' '}
              <i>
                In other words, no third party plug-ins, no accounts, completely
                free real time communication.
              </i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
