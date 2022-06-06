import crypto from 'crypto';
import type { HtmlProps } from 'next/dist/shared/lib/utils';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const favicon =
  process.env.NODE_ENV === 'development'
    ? '/svg/favicon-dev.svg'
    : '/svg/favicon.svg';

const cspHashOf = (text) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `sha256-${hash.digest('base64')}`;
};

// See: https://github.com/vercel/next.js/blob/master/examples/with-strict-csp/pages/_document.js
const getCSPContent = (context: Readonly<HtmlProps>) => {
  const cspInlineScriptHash = cspHashOf(
    NextScript.getInlineScriptSource(context)
  );

  // Dev environment
  if (process.env.NODE_ENV !== 'production') {
    return `default-src 'self';
      style-src 'self' 'unsafe-inline';
      font-src 'self' data:;
      frame-src 'self' *.codesandbox.io;
      img-src 'self' cm.everesttech.net amazonwebservices.d2.sc.omtrdc.net dpm.demdex.net https://images.unsplash.com;
      connect-src 'self' *.shortbread.aws.dev amazonwebservices.d2.sc.omtrdc.net dpm.demdex.net https://*.algolia.net https://*.algolianet.com;
      script-src 'unsafe-eval' 'self' '${cspInlineScriptHash}' a0.awsstatic.com;
    `;
  }

  // Prod environment
  return `default-src 'self';
    style-src 'self' 'unsafe-inline';
    font-src 'self';
    frame-src 'self' *.codesandbox.io aws.demdex.net;
    img-src 'self' cm.everesttech.net amazonwebservices.d2.sc.omtrdc.net dpm.demdex.net https://images.unsplash.com;
    connect-src 'self' *.shortbread.aws.dev amazonwebservices.d2.sc.omtrdc.net dpm.demdex.net https://*.algolia.net https://*.algolianet.com;
    script-src 'unsafe-eval' 'self' '${cspInlineScriptHash}' a0.awsstatic.com;
  `;
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-us">
        <Head>
          <meta
            httpEquiv="Content-Security-Policy"
            content={getCSPContent(this.props)}
          />
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
