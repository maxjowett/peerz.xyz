import Head from 'next/head';
import styles from '../styles/Home.module.scss';

const reasons = [
  {
    title: 'Hassle free',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: '/icons8-take-it-easy-64.png'
  },
  {
    title: 'No third party',
    desc:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

    icon: '/icons8-unavailable-64.png'
  },
  {
    title: 'Peer to peer',
    desc:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: '/icons8-data-transfer-64.png'
  }
];

const Home = () => {
  return (
    <>
      <div className={styles.splash}>
        <div className={`${styles.splash__content} ${`g-row`}`}>
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
      <div className={styles.rundown}>
        <div className={`${styles.rundown__content} ${`g-row`}`}>
          <h3>The rundown</h3>
          <div className={styles.rundown__content_reasons}>
            {reasons.map((r, i) => (
              <div className={styles.rundown__content_reason}>
                <img src={r.icon} />
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.action}>
        <div className={`${styles.action__content} ${`g-row`}`}>
          <div>
            <h4>No account needed, and completely free</h4>
          </div>
          <div className={styles.action__content_button}>
            <a className="g-button-primary">Create session</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
