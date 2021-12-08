import crypto from 'crypto';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const favicon =
  process.env.NODE_ENV === 'development'
    ? '/svg/favicon-dev.svg'
    : '/svg/favicon.svg';

const cspHashOf = (text) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `'sha256-${hash.digest('base64')}'`;
};
class MyDocument extends Document {
  render() {
    // See: https://github.com/vercel/next.js/blob/master/examples/with-strict-csp/pages/_document.js
    let csp = `default-src 'self';
              style-src 'self' fonts.googleapis.com 'unsafe-inline';
              font-src 'self' fonts.gstatic.com;
              script-src 'self' ${cspHashOf(
                NextScript.getInlineScriptSource(this.props)
              )}`;
    if (process.env.NODE_ENV !== 'production') {
      csp = `default-src 'self';
            style-src 'self' fonts.googleapis.com  'unsafe-inline';
            font-src 'self' fonts.gstatic.com data:;
            script-src 'unsafe-eval' 'self' ${cspHashOf(
              NextScript.getInlineScriptSource(this.props)
            )}`;
    }

    return (
      <Html>
        <Head>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
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
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&family=Work+Sans:wght@100..900&display=swap"
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
