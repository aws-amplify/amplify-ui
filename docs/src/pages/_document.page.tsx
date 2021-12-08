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
              style-src 'self' 'unsafe-inline';
              font-src 'self';
              script-src 'self' ${cspHashOf(
                NextScript.getInlineScriptSource(this.props)
              )}`;
    if (process.env.NODE_ENV !== 'production') {
      csp = `default-src 'self';
            style-src 'self' 'unsafe-inline';
            font-src 'self' data:;
            script-src 'unsafe-eval' 'self' ${cspHashOf(
              NextScript.getInlineScriptSource(this.props)
            )}`;
    }

    return (
      <Html>
        <Head>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
          <link rel="icon" type="image/svg+xml" href={favicon} />
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
