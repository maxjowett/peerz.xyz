import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Splash from '../components/splash.js'
import Steps from '../components/steps.js'
import Info from '../components/info.js'
import Details from '../components/details.js'

const Home = () => {
  return (
    <div className="g__container">
      <Splash />
      <Steps />
      <Info />
      <Details />
    </div>
  );
};

export default Home;
