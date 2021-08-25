import { createContext } from 'react';

import { defaultTheme, Theme } from '../../theming';
import { getCSSVariablesFromTheme } from '../../theming';

interface AmplifyContextType {
  components: any;
  theme: {
    themeObject: unknown;
    CSSVariables?: {};
  };
}
export const AmplifyContext = createContext<AmplifyContextType>({
  components: undefined,
  theme: {
    themeObject: defaultTheme,
    CSSVariables: getCSSVariablesFromTheme(defaultTheme),
  },
});
