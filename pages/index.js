import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Splash from '../components/splash.js'
import Steps from '../components/steps.js'
import Info from '../components/info.js'

const Home = () => {
  return (
    <div className="g__container">
      <Splash />
      <Steps />
      <Info />
    </div>
  );
};

export default Home;
