import * as React from 'react';

import { createTheme, Theme } from '@aws-amplify/ui';

import { ThemeContext, ColorMode } from './ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
  colorMode?: ColorMode;
  theme?: Theme;
  root?: boolean;
}

export { ThemeContext, ColorMode };

export function ThemeProvider({
  children,
  colorMode,
  theme,
  root,
}: ThemeProviderProps) {
  // createTheme will always return a fully formed theme object,
  // extending from the default theme. Doing this allows
  // users to still use the `useTheme` hook even if they do not
  // provide a theme
  const webTheme = createTheme(theme);
  const { name, cssText } = webTheme;

  React.useEffect(() => {
    if (root) {
      if (document && document.documentElement) {
        document.documentElement.setAttribute('data-amplify-theme', name);
        document.documentElement.setAttribute(
          'data-amplify-color-mode',
          colorMode
        );
      }

      return function cleanup() {
        if (document && document.documentElement) {
          document.documentElement.removeAttribute('data-amplify-theme');
          document.documentElement.removeAttribute('data-amplify-color-mode');
        }
      };
    }
  }, [name, colorMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme: webTheme,
      }}
    >
      <div data-amplify-theme={name} data-amplify-color-mode={colorMode}>
        {children}
      </div>
      {/* We only want to add CSS if a theme is given */}
      {/* This allows customers to not provide a theme object */}
      {/* And still override design tokens in CSS */}
      {typeof theme === 'undefined' ? null : (
        <style
          id={`amplify-theme-${name}`}
          dangerouslySetInnerHTML={{ __html: cssText }}
        />
      )}
    </ThemeContext.Provider>
  );
}
