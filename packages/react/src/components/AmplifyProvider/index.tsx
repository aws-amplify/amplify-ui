import { ReactNode } from 'react';
import { IdProvider } from '@radix-ui/react-id';

import { AmplifyContext } from './AmplifyContext';
import { defaultTheme, Theme } from '@aws-amplify/ui';

export type ColorMode = 'system' | 'light' | 'dark';

interface AmplifyProviderProps {
  children: ReactNode;
  components: Record<string, ReactNode>;
  theme?: Theme;
  colorMode?: ColorMode;
}

export function AmplifyProvider({
  children,
  components,
  colorMode,
  theme = defaultTheme,
}: AmplifyProviderProps) {
  return (
    <AmplifyContext.Provider
      value={{
        components,
        theme,
      }}
    >
      <IdProvider>
        <div data-amplify-theme="" data-amplify-color-mode={colorMode}>
          {children}
          <style id="amplify" dangerouslySetInnerHTML={{ __html: theme.css }} />
        </div>
      </IdProvider>
    </AmplifyContext.Provider>
  );
}
