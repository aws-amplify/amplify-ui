import '../styles/index.scss';

import * as React from 'react';

import { AmplifyProvider, ColorMode } from '@aws-amplify/ui-react';
import { configure, trackPageVisit } from '../utils/track';

import Head from 'next/head';
import { Header } from '@/components/Layout/Header';
import Script from 'next/script';
import { baseTheme } from '../theme';
import { capitalizeString } from '../utils/capitalizeString';
import { useCustomRouter } from '@/components/useCustomRouter';
import metaData from '../data/pages.preval';

// suppress useLayoutEffect warnings when running outside a browser
// See: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#gistcomment-3886909
// @ts-ignore Cannot assign to 'useLayoutEffect' because it is a read-only property.ts(2540)
if (typeof window === 'undefined') React.useLayoutEffect = React.useEffect;

function MyApp({ Component, pageProps }) {
  const {
    asPath,
    pathname,
    query: { platform = 'react' },
  } = useCustomRouter();

  const filepath = `/${pathname
    .split('/')
    .filter((n) => n && n !== '[platform]')
    .join('/')}`;

  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  const handleColorModeChange = (colorMode: ColorMode) => {
    setColorMode(colorMode);
    if (colorMode !== 'system') {
      localStorage.setItem('colorMode', colorMode);
    } else {
      localStorage.removeItem('colorMode');
    }
  };
  React.useEffect(() => {
    const colorModePreference = localStorage.getItem('colorMode') as ColorMode;
    if (colorModePreference) {
      setColorMode(colorModePreference);
    }
  }, []);

  configure();
  trackPageVisit();

  const { title, metaTitle, description, metaDescription } =
    metaData[pathname]?.frontmatter ?? {};

  if ((!description && !metaDescription) || (!title && !metaTitle)) {
    throw new Error(`Meta Info missing on ${filepath}`);
  }

  return (
    <>
      <Head>
        <title>
          {metaTitle ?? title} | {capitalizeString(platform)} - Amplify UI
        </title>
        {['/', '/react', '/angular', '/vue', '/flutter'].includes(asPath) && (
          <link rel="canonical" href="https://ui.docs.amplify.aws/" />
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metaDescription ?? description} />
      </Head>
      <AmplifyProvider theme={baseTheme} colorMode={colorMode}>
        <Header
          platform={platform}
          colorMode={colorMode}
          setColorMode={handleColorModeChange}
        />
        <Component {...pageProps} colorMode={colorMode} />
      </AmplifyProvider>
      <Script src="https://a0.awsstatic.com/s_code/js/3.0/awshome_s_code.js" />
      <Script src="/scripts/shortbreadv2.js" />
    </>
  );
}

export default MyApp;
