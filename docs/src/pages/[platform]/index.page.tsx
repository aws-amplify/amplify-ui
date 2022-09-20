import * as React from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import { Footer } from '@/components/Layout/Footer';
import { HeroSection } from '@/components/home/sections';
import { isReactNativeEnabled } from '@/utils/featureFlags';

import ReactHomePage from './index.react';
import ReactNativeHomePage from './index.reactnative';
import VueHomePage from './index.vue';
import AngularHomePage from './index.angular';
import FlutterHomePage from './index.flutter';
import { FRAMEWORKS } from '@/data/frameworks';
import { getCustomStaticPath } from '@/utils/getCustomStaticPath';

export async function getStaticPaths() {
  return getCustomStaticPath(FRAMEWORKS);
}

/*
 * `getStaticProps` is required to prevent "Error: getStaticPaths was added without a getStaticProps. Without getStaticProps, getStaticPaths does nothing"
 */

export async function getStaticProps() {
  return { props: {} };
}

const HomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  const handleScroll = debounce((e) => {
    const bodyScroll = e.target.documentElement.scrollTop;
    if (bodyScroll > 50) {
      document.body.classList.add('scrolled');
    } else if (document.body.classList.contains('scrolled')) {
      document.body.classList.remove('scrolled');
    }
  });

  React.useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let pageContent;

  switch (platform) {
    case 'react':
      pageContent = <ReactHomePage colorMode={colorMode} />;
      break;
    case 'vue':
      pageContent = <VueHomePage colorMode={colorMode} />;
      break;
    case 'angular':
      pageContent = <AngularHomePage colorMode={colorMode} />;
      break;
    case 'flutter':
      pageContent = <FlutterHomePage colorMode={colorMode} />;
      break;
    case 'react-native':
      pageContent = isReactNativeEnabled ? (
        <ReactNativeHomePage colorMode={colorMode} />
      ) : (
        <ReactHomePage colorMode={colorMode} />
      );
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

      {/* Shared content */}
      <Footer />
    </>
  );
};

const title = 'Testing';

export { title };

export default HomePage;
