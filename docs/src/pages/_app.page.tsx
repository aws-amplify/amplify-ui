import '../styles/index.scss';

import * as React from 'react';

import { ThemeProvider, ColorMode, defaultTheme } from '@aws-amplify/ui-react';
import { configure, trackPageVisit } from '../utils/track';

import Head from 'next/head';
import { Header } from '@/components/Layout/Header';
import Script from 'next/script';
import { baseTheme } from '../theme';
import { capitalizeString } from '../utils/capitalizeString';
import { useCustomRouter } from '@/components/useCustomRouter';
import metaData from '@/data/pages.preval';

// suppress useLayoutEffect warnings when running outside a browser
// See: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#gistcomment-3886909
// @ts-ignore Cannot assign to 'useLayoutEffect' because it is a read-only property.ts(2540)
if (typeof window === 'undefined') {
  React.useLayoutEffect = React.useEffect;
} else {
  console.log(`
  _____           _ _ ___        _____ _____ 
 |  _  |_____ ___| |_|  _|_ _   |  |  |     |
 |     |     | . | | |  _| | |  |  |  |-   -|
 |__|__|_|_|_|  _|_|_|_| |_  |  |_____|_____|
             |_|         |___|               

  ✨ you can explore the Amplify UI theme object by typing \`theme\` in the console.
 `);
  window['theme'] = defaultTheme;
}

function MyApp({ Component, pageProps }) {
  const {
    asPath,
    pathname,
    query: { platform = 'react' },
  } = useCustomRouter();

  const isHomepage = pathname === '/' || pathname === '/[platform]';

  const filepath = `/${pathname
    .split('/')
    .filter((n) => n && n !== '[platform]')
    .join('/')}`;
  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  const [expanded, setExpanded] = React.useState(false);

  configure();
  trackPageVisit();

  const { title, metaTitle, description, metaDescription } =
    metaData[pathname]?.frontmatter ?? {};

  if ((!description && !metaDescription) || (!title && !metaTitle)) {
    throw new Error(`Meta Info missing on ${filepath}`);
  }

  return (
    <>
      <Head>
        <title>
          {metaTitle ?? title} | {capitalizeString(platform)} - Amplify UI
        </title>
        {['/', '/react', '/angular', '/vue', '/flutter'].includes(asPath) && (
          <link rel="canonical" href="https://ui.docs.amplify.aws/" />
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metaDescription ?? description} />
      </Head>
      <div className={isHomepage ? `docs-home` : ''}>
        <ThemeProvider theme={baseTheme} colorMode={colorMode}>
          <Header
            expanded={expanded}
            setExpanded={setExpanded}
            colorMode={colorMode}
            setColorMode={setColorMode}
            platform={platform}
          />
          <div className={`docs-main`}>
            <div
              className={`docs-sidebar-spacer ${
                expanded ? 'expanded' : 'collapsed'
              }`}
            />

            <Component
              {...pageProps}
              setExpanded={setExpanded}
              colorMode={colorMode}
            />
          </div>
        </ThemeProvider>
      </div>
      <Script src="https://a0.awsstatic.com/s_code/js/3.0/awshome_s_code.js" />
      <Script src="/scripts/shortbreadv2.js" />
    </>
  );
}

export default MyApp;
