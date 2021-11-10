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
  return (
    <>
      <Head>
        <title>Amplify UI</title>
      </Head>
      <AmplifyProvider components={{}} theme={theme} colorMode={colorMode}>
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
