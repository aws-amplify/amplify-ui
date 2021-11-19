import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AmplifyProvider, ColorMode } from '@aws-amplify/ui-react';

import { Header } from '@/components/Layout/Header';

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

  const favicon =
    process.env.NODE_ENV === 'development'
      ? '/svg/favicon-dev.svg'
      : '/svg/favicon.svg';
  return (
    <div className={themeOverride}>
      <Head>
        <title>Amplify UI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href={favicon} />
        {/* Adding custom variable fonts from google */}
        {/* Including multiple to show theming capabilities */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&family=Open+Sans:wght@300..800&family=Work+Sans:wght@100..900&display=swap"
          rel="stylesheet"
        />
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
    </div>
  );
}

export default MyApp;
