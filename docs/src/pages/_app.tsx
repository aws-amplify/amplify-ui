import "@aws-amplify/ui-react/styles.css";
import "@aws-amplify/ui/dist/style.css";
import Head from "next/head";
import "../styles/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

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
