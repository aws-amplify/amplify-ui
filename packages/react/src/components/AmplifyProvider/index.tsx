import { ReactNode } from 'react';
import { IdProvider } from '@radix-ui/react-id';

import { AmplifyContext } from './AmplifyContext';
import { theme as defaultTheme, Theme } from '@aws-amplify/ui';

interface AmplifyProviderProps {
  children: ReactNode;
  components: Record<string, ReactNode>;
  theme?: Theme;
}

export function AmplifyProvider({
  children,
  components,
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
        <div data-amplify-theme="">{children}</div>
      </IdProvider>
    </AmplifyContext.Provider>
  );
}
