import * as React from 'react';
import { defaultCSSVariables, defaultTheme, Theme } from '../../theming';
import { AmplifyContext } from './AmplifyContext';

interface AmplifyProviderProps {
  children: React.ReactNode;
  components: Record<string, React.ReactNode>;
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
      <div data-amplify-theme="">{children}</div>
    </AmplifyContext.Provider>
  );
}
