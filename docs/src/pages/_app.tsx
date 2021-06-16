import Head from "next/head";

import "../styles/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Amplify UI</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
