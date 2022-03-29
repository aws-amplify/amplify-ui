import * as React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { AmplifyProvider, ColorMode } from '@aws-amplify/ui-react';

import { Header } from '@/components/Layout/Header';
import { configure, trackPageVisit } from '../utils/track';
import { theme } from '../theme';
import { META_INFO } from '@/data/meta';
import '../styles/index.scss';

// suppress useLayoutEffect warnings when running outside a browser
// See: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#gistcomment-3886909
// @ts-ignore Cannot assign to 'useLayoutEffect' because it is a read-only property.ts(2540)
if (typeof window === 'undefined') React.useLayoutEffect = React.useEffect;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { platform = 'react' } = router.query;
  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  const [themeOverride, setThemeOverride] = React.useState('');

  React.useEffect(() => {
    document.documentElement.setAttribute(
      'data-amplify-theme-override',
      themeOverride
    );
  }, [themeOverride]);

  configure();
  trackPageVisit();

  if (
    !META_INFO[router.pathname]?.description ||
    !META_INFO[router.pathname]?.title
  ) {
    throw new Error(`Meta Info missing on ${router.pathname}`);
  }

  return (
    <>
      <Head>
        <title>{META_INFO[router.pathname].title} | Amplify UI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {META_INFO[router.pathname] && (
          <meta
            name="description"
            content={META_INFO[router.pathname].description}
          />
        )}
      </Head>
      <AmplifyProvider theme={theme} colorMode={colorMode}>
        <Header
          platform={platform}
          colorMode={colorMode}
          setColorMode={setColorMode}
        />
        <Component
          {...pageProps}
          colorMode={colorMode}
          setThemeOverride={setThemeOverride}
          themeOverride={themeOverride}
        />
      </AmplifyProvider>
      <Script src="https://a0.awsstatic.com/s_code/js/3.0/awshome_s_code.js" />
      <Script src="/scripts/shortbreadv2.js" />
    </>
  );
}

export default MyApp;
