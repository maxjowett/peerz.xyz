import React from 'react';

import '../styles/normalize.css';
import '../styles/main.scss';

import Hero from '../components/hero.js';
import Rundown from '../components/rundown.js';

const Index = () => {
  return (
    <>
      <Hero />
      <Rundown />
    </>
  );
};

export default Index;
