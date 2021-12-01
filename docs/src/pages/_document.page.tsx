import Document, { Html, Head, Main, NextScript } from 'next/document';

const favicon =
  process.env.NODE_ENV === 'development'
    ? '/svg/favicon-dev.svg'
    : '/svg/favicon.svg';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/svg+xml" href={favicon} />
          {/* Adding custom variable fonts from google */}
          {/* Including multiple to show theming capabilities */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=family=Open+Sans:wght@300..800&family=Work+Sans:wght@100..900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
