import * as React from 'react';

import { createTheme, defaultTheme, Theme as UiTheme } from '@aws-amplify/ui';

import { ThemeContext } from './ThemeContext';

type Theme = UiTheme;
type ColorMode = 'system' | 'light' | 'dark';

interface ThemeProviderProps {
  children: React.ReactNode;
  colorMode?: ColorMode;
  theme?: Theme;
}

export function ThemeProvider({
  children,
  colorMode,
  theme = defaultTheme,
}: ThemeProviderProps) {
  const webTheme = createTheme(theme);
  const { name, cssText } = webTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme: webTheme,
      }}
    >
      <div data-amplify-theme={name} data-amplify-color-mode={colorMode}>
        {children}
      </div>
      <style
        id={`amplify-theme-${name}`}
        dangerouslySetInnerHTML={{ __html: cssText }}
      />
    </ThemeContext.Provider>
  );
}
