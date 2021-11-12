import { IdProvider } from '@radix-ui/react-id';
import { ReactNode } from 'react';

import { AmplifyContext } from './AmplifyContext';
import { createTheme, defaultTheme, Theme } from '@aws-amplify/ui';
import * as primitives from '../../primitives/components';

export type ColorMode = 'system' | 'light' | 'dark';

interface AmplifyProviderProps {
  children: ReactNode;
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
