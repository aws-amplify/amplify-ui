import { ReactNode } from 'react';

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
      <div data-amplify-theme="">{children}</div>
    </AmplifyContext.Provider>
  );
}
