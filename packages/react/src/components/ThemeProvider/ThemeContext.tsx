import * as React from 'react';

import { createTheme, WebTheme } from '@aws-amplify/ui';
import { ColorMode } from './ThemeProvider';

export interface ThemeContextType {
  theme: WebTheme;
  colorMode?: ColorMode;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: createTheme(),
  colorMode: undefined,
});
