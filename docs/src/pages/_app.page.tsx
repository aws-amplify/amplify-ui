import { parse } from 'url';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import 'amplify-docs/src/styles/styles.css';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { platform } = router.query;

  return (
    <>
      <Head>
        <title>Amplify UI</title>
      </Head>

      <Component
        components={{
          a(props) {
            if (!props.href) {
              return <a {...props} />;
            }

            const url = JSON.parse(JSON.stringify(parse(props.href)));

            return (
              <Link
                href={{
                  ...url,
                  query: {
                    platform,
                    ...url.query,
                  },
                }}
              >
                <a>{props.children}</a>
              </Link>
            );
          },
        }}
        {...pageProps}
      />

      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js"></script>
      <script src="https://a0.awsstatic.com/s_code/js/3.0/awshome_s_code.js"></script>
      <script src="/scripts/shortbreadv1.js"></script>
    </>
  );
}

export default MyApp;
