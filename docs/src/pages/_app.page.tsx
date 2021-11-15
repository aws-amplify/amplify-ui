import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AmplifyProvider, ColorMode } from '@aws-amplify/ui-react';

import { Header } from '@/components/Layout/Header';

import { theme } from '../theme';
import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { platform = 'react' } = router.query;
  const [colorMode, setColorMode] = useState<ColorMode>('system');
  const favicon =
    process.env.NODE_ENV === 'development'
      ? '/svg/favicon-dev.svg'
      : '/svg/favicon.svg';
  return (
    <>
      <Head>
        <title>Amplify UI</title>
        <link rel="icon" type="image/svg+xml" href={favicon} />
      </Head>
      <AmplifyProvider theme={theme} colorMode={colorMode}>
        <Header
          platform={platform}
          colorMode={colorMode}
          setColorMode={setColorMode}
        />
        <Component {...pageProps} colorMode={colorMode} />
      </AmplifyProvider>
    </>
  );
}

export default MyApp;
