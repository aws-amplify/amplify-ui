import * as React from 'react';

import { defaultTheme, WebTheme } from '@aws-amplify/ui';

export interface ThemeContextType {
  theme: WebTheme;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: defaultTheme,
});
