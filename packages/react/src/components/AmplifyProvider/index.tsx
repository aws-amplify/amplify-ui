import * as React from 'react';
import { IdProvider } from '@radix-ui/react-id';

import { defaultTheme, Theme as UiTheme } from '@aws-amplify/ui';

import { AmplifyContext } from './AmplifyContext';
import { ThemeProvider } from '../ThemeProvider';

export type Theme = UiTheme;
export type ColorMode = 'system' | 'light' | 'dark';

interface AmplifyProviderProps {
  children: React.ReactNode;
  colorMode?: ColorMode;
  theme?: Theme;
}

export function AmplifyProvider({
  children,
  colorMode,
  theme = defaultTheme,
}: AmplifyProviderProps) {
  const { name } = theme;
  React.useEffect(() => {
    if (document && document.documentElement) {
      document.documentElement.setAttribute('data-amplify-theme', name);
      document.documentElement.setAttribute(
        'data-amplify-color-mode',
        colorMode
      );
    }
  }, [theme, colorMode]);
  return (
    <AmplifyContext.Provider
      value={{
        theme: theme,
      }}
    >
      <IdProvider>
        <ThemeProvider theme={theme} colorMode={colorMode}>
          {children}
        </ThemeProvider>
      </IdProvider>
    </AmplifyContext.Provider>
  );
}
