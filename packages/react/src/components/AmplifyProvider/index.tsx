import * as React from 'react';

import { createTheme, Theme } from '@aws-amplify/ui';

import { AmplifyContext } from './AmplifyContext';

export type ColorMode = 'system' | 'light' | 'dark';

interface AmplifyProviderProps {
  children: React.ReactNode;
  colorMode?: ColorMode;
  theme?: Theme;
}

export function AmplifyProvider({
  children,
  colorMode,
  theme,
}: AmplifyProviderProps) {
  const webTheme = createTheme(theme);
  const { name, cssText } = webTheme;

  // In order for the theme to apply to Portalled elements like our Menu
  // we need to put the CSS variables we generate from the theme on the
  // root element. The CSS selector that contains the CSS variables
  // uses the data attributes present on the root element, and because
  // the same data attributes are on a div down the DOM tree, the CSS variables
  // will apply to both.
  React.useEffect(() => {
    if (document && document.documentElement) {
      // Keep original data attributes to reset on unmount
      const originalName =
        document.documentElement.getAttribute('data-amplify-theme');
      const originalColorMode = document.documentElement.getAttribute(
        'data-amplify-color-mode'
      );
      document.documentElement.setAttribute('data-amplify-theme', name);
      document.documentElement.setAttribute(
        'data-amplify-color-mode',
        colorMode || ''
      );

      return function cleanup() {
        document.documentElement.setAttribute(
          'data-amplify-theme',
          originalName
        );
        document.documentElement.setAttribute(
          'data-amplify-color-mode',
          originalColorMode
        );
      };
    }
  }, [name, colorMode]);
  return (
    <AmplifyContext.Provider
      value={{
        theme: webTheme,
      }}
    >
      {/*
          The data attributes on here as well as the root element allow for nested
          themes to work because CSS variables are inherited, ones closer in the 
          ancestor tree will override further ones. So the CSS variables added to this
          DOM node through the same selector will take precedence.
        */}
      <div data-amplify-theme={name} data-amplify-color-mode={colorMode}>
        {children}
      </div>
      {/*
          Only inject theme CSS variables if given a theme.
          The CSS file users import already has the default theme variables in it.
          This will allow users to use the provider and theme with CSS variables
          without having to worry about specificity issues because this stylesheet
          will likely come after a user's defined CSS.
        */}
      {typeof theme === 'undefined' ? null : (
        <style
          id={`amplify-theme-${name}`}
          dangerouslySetInnerHTML={{ __html: cssText }}
        />
      )}
    </AmplifyContext.Provider>
  );
}
