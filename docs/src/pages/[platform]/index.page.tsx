import { Footer } from '@/components/Layout/Footer';
import { useCustomRouter } from '@/components/useCustomRouter';
import React from 'react';
import { AmplifySection } from './AmplifySection';
import { HeroSection } from './HeroSection';
import ReactHomePage from './index.react';
import VueHomePage from './index.vue';

const HomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  let pageContent;

  switch (platform) {
    case 'react':
      pageContent = <ReactHomePage colorMode={colorMode} />;
      break;
    case 'vue':
      pageContent = <VueHomePage colorMode={colorMode} />;
      break;
    default:
      pageContent = <ReactHomePage colorMode={colorMode} />;
      break;
  }

  return (
    <>
      {/* Hero/intro */}
      <HeroSection />

      {/* Framework content */}
      {pageContent}

      <AmplifySection />

      <Footer />
    </>
  );
};

export default HomePage;
