import React from 'react';

import Hero from 'features/landing/Hero';
import Features from 'features/landing/Features';
import GetStartedBanner from 'features/landing/GetStartedBanner';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <GetStartedBanner />
    </>
  );
};

export default HomePage;
