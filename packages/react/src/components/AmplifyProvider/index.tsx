import * as React from 'react';
import { IdProvider } from '@radix-ui/react-id';

import { createTheme, defaultTheme, Theme as UiTheme } from '@aws-amplify/ui';

import { AmplifyContext } from './AmplifyContext';

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
  const webTheme = createTheme(theme);
  const { name, cssText } = webTheme;
  return (
    <AmplifyContext.Provider
      value={{
        theme: webTheme,
      }}
    >
      <IdProvider>
        <div data-amplify-theme={name} data-amplify-color-mode={colorMode}>
          {children}
        </div>
        <style
          id={`amplify-theme-${name}`}
          dangerouslySetInnerHTML={{ __html: cssText }}
        />
      </IdProvider>
    </AmplifyContext.Provider>
  );
}
