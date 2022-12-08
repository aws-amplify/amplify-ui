import * as React from 'react';
import { Storage } from 'aws-amplify';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { ThemeProvider, ColorMode, defaultTheme } from '@aws-amplify/ui-react';

import MyStorageProvider from '@/utils/storageMock';
import { configure, trackPageVisit } from '@/utils/track';
import { IS_PROD_STAGE } from '@/utils/stage';
import { Header } from '@/components/Layout/Header';
import { baseTheme } from '../theme';

import { Head } from './Head';

import Prism from 'prism-react-renderer/prism';

globalThis.Prism = Prism;

require('prismjs/components/prism-dart');

import '../styles/index.scss';
import classNames from 'classnames';
import { GlobalNav, NavMenuItem } from '@/components/Layout/GlobalNav';
import {
  LEFT_NAV_LINKS,
  RIGHT_NAV_LINKS,
  SOCIAL_LINKS,
} from '@/data/globalnav';

if (typeof window === 'undefined') {
  // suppress useLayoutEffect warnings when running outside a browser
  // See: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85?permalink_comment_id=4150784#gistcomment-4150784
  // @ts-ignore Cannot assign to 'useLayoutEffect' because it is a read-only property.ts(2540)
  React.useLayoutEffect = () => {};
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
  const [expanded, setExpanded] = React.useState(false);

  Storage.addPluggable(new MyStorageProvider('fast', { delay: 10 }));
  Storage.addPluggable(new MyStorageProvider('slow', { delay: 1000 }));
  Storage.addPluggable(
    new MyStorageProvider('error', { delay: 50, networkError: true })
  );

  const {
    pathname,
    query: { platform = 'react' },
  } = useRouter();

  const isHomepage = pathname === '/' || pathname === '/[platform]';

  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  const handleColorModeChange = (colorMode: ColorMode) => {
    setColorMode(colorMode);
    if (colorMode !== 'system') {
      localStorage.setItem('colorMode', colorMode);
    } else {
      localStorage.removeItem('colorMode');
    }
    // Algolia search renders in a Portal so we need to do this
    document.documentElement.setAttribute('data-amplify-color-mode', colorMode);
  };

  React.useEffect(() => {
    const colorModePreference = localStorage.getItem('colorMode') as ColorMode;
    if (colorModePreference) {
      setColorMode(colorModePreference);
    }
    document.documentElement.setAttribute(
      'data-amplify-color-mode',
      colorModePreference || 'system'
    );
  }, []);

  React.useEffect(() => {
    if (IS_PROD_STAGE) {
      configure();
      trackPageVisit();
    }
  }, [pathname]); // only track page visit if path has changed

  return (
    <>
      <Head />

      <div className={isHomepage ? `docs-home` : ''}>
        <ThemeProvider theme={baseTheme} colorMode={colorMode}>
          {
            <GlobalNav
              rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
              leftLinks={LEFT_NAV_LINKS as NavMenuItem[]}
              socialLinks={SOCIAL_LINKS as NavMenuItem[]}
              currentSite="UI Library"
            />
          }
          <Header
            expanded={expanded}
            setExpanded={setExpanded}
            colorMode={colorMode}
            setColorMode={handleColorModeChange}
            platform={platform}
          />
          <main className="docs-main">
            <div
              className={classNames(
                'docs-sidebar-spacer',
                expanded ? 'expanded' : 'collapsed'
              )}
            />

            <Component
              {...pageProps}
              setExpanded={setExpanded}
              colorMode={colorMode}
            />
          </main>
        </ThemeProvider>
      </div>
      {IS_PROD_STAGE && (
        <>
          <Script src="https://a0.awsstatic.com/s_code/js/3.0/awshome_s_code.js" />
          <Script src="/scripts/shortbreadv2.js" />
        </>
      )}
    </>
  );
}

export default MyApp;
