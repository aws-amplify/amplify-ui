import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AmplifyProvider, Divider } from '@aws-amplify/ui-react';

import { Header } from '@/components/Layout/Header';

import { theme } from './theme';
import '../styles/index.css';


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { platform } = router.query;

  return (
    <>
      <Head>
        <title>Amplify UI</title>
      </Head>
      <AmplifyProvider components={{}} theme={theme}>
      <div className="aui-docs">
        <Header />
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
      </div>
      </AmplifyProvider>
    </>
  );
}

export default MyApp;
