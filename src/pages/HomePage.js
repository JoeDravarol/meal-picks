import React from 'react';

import Hero from 'features/landing/Hero';
import AboutApp from 'features/landing/AboutApp';
import Features from 'features/landing/Features';
import GetStartedBanner from 'features/landing/GetStartedBanner';

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutApp />
      <Features />
      <GetStartedBanner />
    </>
  );
};

export default HomePage;
