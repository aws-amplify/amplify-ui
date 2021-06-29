import "@aws-amplify/ui-react/styles.css";
import "@aws-amplify/ui/dist/style.css";
import Head from "next/head";
import "../content/primitives/button/buttonStyles.css";
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
