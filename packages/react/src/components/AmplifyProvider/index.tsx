import { IdProvider } from '@radix-ui/react-id';
import { ReactNode } from 'react';

import { AmplifyContext } from './AmplifyContext';
import { defaultTheme, BrowserTheme } from '@aws-amplify/ui';

export type ColorMode = 'system' | 'light' | 'dark';

interface AmplifyProviderProps {
  children: ReactNode;
  components: Record<string, ReactNode>;
  theme?: BrowserTheme;
  colorMode?: ColorMode;
}

export function AmplifyProvider({
  children,
  components,
  colorMode,
  theme = defaultTheme,
}: AmplifyProviderProps) {
  const { name = '' } = theme;
  return (
    <AmplifyContext.Provider
      value={{
        components,
        theme,
      }}
    >
      <IdProvider>
        <div data-amplify-theme={name} data-amplify-color-mode={colorMode}>
          {children}
        </div>
        <style
          id={`amplify-theme-${name}`}
          dangerouslySetInnerHTML={{ __html: theme.cssText }}
        />
      </IdProvider>
    </AmplifyContext.Provider>
  );
}

export { AmplifyContext };
