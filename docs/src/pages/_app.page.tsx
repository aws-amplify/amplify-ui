import * as React from 'react';

import { ThemeProvider, ColorMode, defaultTheme } from '@aws-amplify/ui-react';

import { configure, trackPageVisit } from '@/utils/track';
import { Header } from '@/components/Layout/Header';
import Script from 'next/script';
import { baseTheme } from '../theme';
import { useCustomRouter } from '@/components/useCustomRouter';

import { Head } from './Head';

import '../styles/index.scss';

if (typeof window === 'undefined') {
  // suppress useLayoutEffect warnings when running outside a browser
  // See: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#gistcomment-3886909
  // @ts-ignore Cannot assign to 'useLayoutEffect' because it is a read-only property.ts(2540)
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
  const [expanded, setExpanded] = React.useState(false);

  const {
    pathname,
    query: { platform = 'react' },
  } = useCustomRouter();

  const isHomepage = pathname === '/' || pathname === '/[platform]';

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

  configure();
  trackPageVisit();

  return (
    <>
      <Head />

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
