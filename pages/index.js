import Head from 'next/head';
import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <div className={styles.splash}>
      <div className={styles.splash__content}>
        <div className={styles.splash__left}>
          <h1>
            Peer to peer
            <br />
            video chat
            <br />
            should be simple
          </h1>
        </div>
        <div className={styles.splash__right}>
          <img className={styles.splash__img} src="/blob.png" />
        </div>
      </div>
    </div>
  );
};

export default Home;
