import * as React from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import { Footer } from '@/components/Layout/Footer';
import { HeroSection } from '@/components/home/sections';

import ReactHomePage from './index.react';
import ReactNativeHomePage from './index.react-native';
import VueHomePage from './index.vue';
import AngularHomePage from './index.angular';
import FlutterHomePage from './index.flutter';
import { FRAMEWORKS } from '@/data/frameworks';
import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
import SwiftHomePage from './index.swift';
import AndroidHomePage from './index.android';

export async function getStaticPaths() {
  return getCustomStaticPath(FRAMEWORKS);
}

/*
 * `getStaticProps` is required to prevent "Error: getStaticPaths was added without a getStaticProps. Without getStaticProps, getStaticPaths does nothing"
 */

export async function getStaticProps() {
  return { props: {} };
}

const handleScroll = debounce((e) => {
  const bodyScroll = e.target.documentElement.scrollTop;
  if (bodyScroll > 50) {
    document.body.classList.add('scrolled');
  } else if (document.body.classList.contains('scrolled')) {
    document.body.classList.remove('scrolled');
  }
});

const HomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

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
      pageContent = <ReactNativeHomePage colorMode={colorMode} />;
      break;
    case 'android':
      pageContent = <AndroidHomePage colorMode={colorMode} />;
      break;
    case 'swift':
      pageContent = null;
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
