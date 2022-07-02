import crypto from 'crypto';
import type { HtmlProps } from 'next/dist/shared/lib/utils';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ANALYTICS_CSP } from '@/data/csp';

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
      frame-src 'self' ${ANALYTICS_CSP.all.frame.join(' ')} *.youtube.com;
      img-src 'self' ${ANALYTICS_CSP.all.img.join(' ')};
      connect-src 'self' *.shortbread.aws.dev ${ANALYTICS_CSP.all.connect.join(
        ' '
      )} https://*.algolia.net https://*.algolianet.com;
      script-src 'unsafe-eval' 'self' '${cspInlineScriptHash}' ${ANALYTICS_CSP.all.script.join(
      ' '
    )};
    `;
  }

  // Prod environment
  return `default-src 'self';
    style-src 'self' 'unsafe-inline';
    font-src 'self';
    frame-src 'self' ${[
      ...ANALYTICS_CSP.all.frame,
      ...ANALYTICS_CSP.prod.frame,
    ].join(' ')} *.youtube.com;
    img-src 'self' ${[...ANALYTICS_CSP.all.img, ...ANALYTICS_CSP.prod.img].join(
      ' '
    )};
    connect-src 'self' *.shortbread.aws.dev ${[
      ...ANALYTICS_CSP.all.connect,
      ...ANALYTICS_CSP.prod.connect,
    ].join(' ')} https://*.algolia.net https://*.algolianet.com;
    script-src 'unsafe-eval' 'self' '${cspInlineScriptHash}' ${ANALYTICS_CSP.all.script.join(
    ' '
  )};
  `;
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-us" data-amplify-theme="amplify-docs">
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
