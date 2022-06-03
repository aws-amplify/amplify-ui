import * as React from 'react';

import { ThemeProvider, ColorMode, defaultTheme } from '@aws-amplify/ui-react';
import { configure, trackPageVisit } from '../utils/track';

import Head from 'next/head';
import { Header } from '@/components/Layout/Header';
import Script from 'next/script';
import { baseTheme } from '../theme';
import { capitalizeString } from '@/utils/capitalizeString';
import { useCustomRouter } from '@/components/useCustomRouter';
import metaData from '@/data/pages.preval';
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from '@/data/preview';

import { getImagePath } from '@/utils/previews';

import '../styles/index.scss';

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

  const asPathname = pathname.replace('[platform]', String(platform));

  const isHomepage = pathname === '/' || pathname === '/[platform]';

  const filepath = `/${pathname
    .split('/')
    .filter((n) => n && n !== '[platform]')
    .join('/')}`;

  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  const handleColorModeChange = (colorMode: ColorMode) => {
    setColorMode(colorMode);
    if (colorMode !== 'system') {
      localStorage.setItem('colorMode', colorMode);
    } else {
      localStorage.removeItem('colorMode');
    }
  };
  React.useEffect(() => {
    const colorModePreference = localStorage.getItem('colorMode') as ColorMode;
    if (colorModePreference) {
      setColorMode(colorModePreference);
    }
  }, []);

  const [expanded, setExpanded] = React.useState(false);

  configure();
  trackPageVisit();

  const { title, metaTitle, description, metaDescription } =
    metaData[pathname]?.frontmatter ?? {};

  if ((!description && !metaDescription) || (!title && !metaTitle)) {
    throw new Error(`Meta Info missing on ${filepath}`);
  }

  const pageTitle = `${metaTitle ?? title} | ${capitalizeString(
    platform
  )} - Amplify UI`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {['/', '/react', '/angular', '/vue', '/flutter'].includes(asPath) && (
          <link rel="canonical" href="https://ui.docs.amplify.aws/" />
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metaDescription ?? description} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="object" />
        <meta property="og:url" content={`${process.env.SITE_URL}${asPath}`} />
        <meta
          property="og:image"
          content={process.env.SITE_URL + getImagePath(asPathname)}
        />
        <meta property="og:image:width" content={String(PREVIEW_WIDTH)} />
        <meta property="og:image:height" content={String(PREVIEW_HEIGHT)} />
        <meta
          property="og:image:secure_url"
          content={process.env.SITE_URL + getImagePath(asPathname)}
        />
        <meta property="og:image:type" content="image/png" />
        <meta
          property="og:image:alt"
          content={metaDescription ?? description}
        />
      </Head>
      <div className={isHomepage ? `docs-home` : ''}>
        <ThemeProvider theme={baseTheme} colorMode={colorMode}>
          <Header
            expanded={expanded}
            setExpanded={setExpanded}
            colorMode={colorMode}
            setColorMode={handleColorModeChange}
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
