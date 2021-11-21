import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preconnect"
            href="https://beta.console.harmony.a2z.com/navigation/harmony-navbar.js"
          />
        </Head>
        <body>
          <title>Liveness Example App</title>
          <h1>Liveness Example App</h1>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
