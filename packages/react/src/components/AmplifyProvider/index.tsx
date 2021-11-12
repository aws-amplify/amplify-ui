import { IdProvider } from '@radix-ui/react-id';
import * as React from 'react';

import { createTheme, defaultTheme, Theme as UiTheme } from '@aws-amplify/ui';

import { AmplifyContext } from './AmplifyContext';
import * as primitives from '../../primitives/components';

export type Theme = UiTheme;
export type ColorMode = 'system' | 'light' | 'dark';

interface AmplifyProviderProps {
  children: React.ReactNode;
  components?: Partial<typeof primitives>;
  theme?: Theme;
  colorMode?: ColorMode;
}

export function AmplifyProvider({
  children,
  components,
  colorMode,
  theme = defaultTheme,
}: AmplifyProviderProps) {
  const webTheme = createTheme(theme);
  const { name, cssText } = webTheme;
  return (
    <AmplifyContext.Provider
      value={{
        components,
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
