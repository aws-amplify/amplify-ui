import { ReactNode } from 'react';
import { IdProvider } from '@radix-ui/react-id';

import { AmplifyContext } from './AmplifyContext';
import { defaultTheme, defaultCSSVariables, Theme } from '../../theming';

interface AmplifyProviderProps {
  children: ReactNode;
  components: Record<string, ReactNode>;
  theming?: { theme: Theme; CSSVariables: {} };
}
export function AmplifyProvider({
  children,
  components,
  theming = { theme: defaultTheme, CSSVariables: defaultCSSVariables },
}: AmplifyProviderProps) {
  return (
    <AmplifyContext.Provider
      value={{
        components,
        theming,
      }}
    >
      <IdProvider>
        <div data-amplify-theme="">{children}</div>
      </IdProvider>
    </AmplifyContext.Provider>
  );
}
