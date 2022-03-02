import * as React from 'react';

import { defaultTheme, WebTheme } from '@aws-amplify/ui';

export type ColorMode = 'system' | 'light' | 'dark';

export interface ThemeContextType {
  theme: WebTheme;
  colorMode?: ColorMode;
  setColorMode?: React.Dispatch<React.SetStateAction<ColorMode>>;
  root?: boolean;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: defaultTheme,
  root: false,
});
