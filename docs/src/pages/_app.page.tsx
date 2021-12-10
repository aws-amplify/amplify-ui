import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AmplifyProvider, ColorMode } from '@aws-amplify/ui-react';

import { Header } from '@/components/Layout/Header';
import { trackPageVisit } from '../utils/track';
import { theme } from '../theme';
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
    trackPageVisit();
  }, []);

  return (
    <div className={themeOverride}>
      <Head>
        <title>Amplify UI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <script src="https://a0.awsstatic.com/s_code/js/3.0/awshome_s_code.js"></script>
      <script src="/scripts/shortbreadv2.js"></script>
    </div>
  );
}

export default MyApp;
