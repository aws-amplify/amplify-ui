import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AmplifyProvider, ColorMode } from '@aws-amplify/ui-react';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

import { theme } from './theme';
import '../styles/index.css';

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
        <div className="aui-docs">
          <Header
            platform={platform}
            colorMode={colorMode}
            setColorMode={setColorMode}
          />
          <div>
            <Component
              components={{
                a(props) {
                  if (!props.href) {
                    return <a {...props} />;
                  }

                  return (
                    <Link
                      href={{
                        pathname: props.href,
                        query: { platform },
                      }}
                    >
                      <a>{props.children}</a>
                    </Link>
                  );
                },
              }}
              {...pageProps}
            />
          </div>
          {/* <Footer /> */}
        </div>
      </AmplifyProvider>
    </>
  );
}

export default MyApp;
