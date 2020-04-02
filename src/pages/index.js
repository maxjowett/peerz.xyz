import React from 'react';

import '../styles/normalize.css';
import '../styles/main.scss';

import Navbar from '../components/navbar.js';
import Hero from '../components/hero.js';
import Rundown from '../components/rundown.js';
import FAQ from '../components/faq.js';
import Footer from '../components/footer.js';

const Index = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Rundown />
      <FAQ />
      <Footer />
    </>
  );
};

export default Index;
