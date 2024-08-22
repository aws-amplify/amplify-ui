import * as React from 'react';
import * as RadixDirection from '@radix-ui/react-direction';

import {
  createTheme,
  Theme,
  WebTheme,
  sanitizeNamespaceImport,
} from '@aws-amplify/ui';

import { ThemeContext } from './ThemeContext';
import { ThemeStyle } from './ThemeStyle';

// Radix packages don't support ESM in Node, in some scenarios(e.g. SSR)
// We have to use namespace import and sanitize it to ensure the interoperablity between ESM and CJS
const { DirectionProvider } = sanitizeNamespaceImport(RadixDirection);

export type ColorMode = 'system' | 'light' | 'dark';
export type Direction = 'ltr' | 'rtl';

interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Changes the color mode applied to the theme
   */
  colorMode?: ColorMode;
  /**
   * Controls the language direction in the app
   * @default: 'ltr'
   */
  direction?: Direction;
  /**
   * Provide a server generated nonce which matches your CSP `style-src` rule.
   * This will be attached to the generated <style> tag.
   * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src
   */
  nonce?: string;
  /**
   * Custom theme
   */
  theme?: Theme | WebTheme;
}

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/theming)
 */
export function ThemeProvider({
  children,
  colorMode,
  direction = 'ltr',
  nonce,
  theme,
}: ThemeProviderProps): JSX.Element {
  const value = React.useMemo(
    () => ({ theme: createTheme(theme), colorMode }),
    [theme, colorMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <DirectionProvider dir={direction}>
        {/*
          The data attributes on here as well as the root element allow for nested
          themes to work because CSS variables are inherited, ones closer in the 
          ancestor tree will override further ones. So the CSS variables added to this
          DOM node through the same selector will take precedence.
        */}
        <div
          data-amplify-theme={value.theme.name}
          data-amplify-color-mode={colorMode}
          dir={direction}
        >
          {children}
        </div>
        {theme ? <ThemeStyle theme={value.theme} nonce={nonce} /> : null}
      </DirectionProvider>
    </ThemeContext.Provider>
  );
}
