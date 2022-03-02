import * as React from 'react';
import { IdProvider } from '@radix-ui/react-id';

import { Theme } from '@aws-amplify/ui';

import { AmplifyContext } from './AmplifyContext';
import { ThemeProvider, ColorMode } from '../ThemeProvider';

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
  return (
    <AmplifyContext.Provider
      value={{
        theme,
      }}
    >
      <IdProvider>
        <ThemeProvider theme={theme} colorMode={colorMode} root={true}>
          {children}
        </ThemeProvider>
      </IdProvider>
    </AmplifyContext.Provider>
  );
}
