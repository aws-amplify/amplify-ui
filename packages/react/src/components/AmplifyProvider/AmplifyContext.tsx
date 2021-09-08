import { createContext, ReactNode } from 'react';

import { defaultCSSVariables, defaultTheme, Theme } from '../../theming';

interface AmplifyContextType {
  components: Record<string, ReactNode>;
  theming: {
    theme: Theme;
    CSSVariables?: {};
  };
}
export const AmplifyContext = createContext<AmplifyContextType>({
  components: undefined,
  theming: {
    theme: defaultTheme,
    CSSVariables: defaultCSSVariables,
  },
});
