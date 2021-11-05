import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  AmplifyProvider,
  ColorMode,
  Heading,
  Link,
  IconLink,
} from '@aws-amplify/ui-react';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

import { theme } from './theme';
import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { platform = 'react' } = router.query;
  const [colorMode, setColorMode] = useState<ColorMode>('system');
  const [themeOverride, setThemeOverride] = useState('default');
  return (
    <>
      <Head>
        <title>Amplify UI</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Ubuntu&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AmplifyProvider
        className={themeOverride}
        components={{}}
        theme={theme}
        colorMode={colorMode}
      >
        <Header
          platform={platform}
          colorMode={colorMode}
          setColorMode={setColorMode}
        />
        <Component
          {...pageProps}
          themeOverride={themeOverride}
          colorMode={colorMode}
          setThemeOverride={setThemeOverride}
        />
      </AmplifyProvider>
    </>
  );
}

export default MyApp;
