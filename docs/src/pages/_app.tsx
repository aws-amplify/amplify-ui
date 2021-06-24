import Head from "next/head";

import "../styles/styles.css";
import "@aws-amplify/ui-react/styles.css";
import "../content/primitives/button/buttonStyles.css";

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
