import * as React from 'react';

import { createTheme } from './createTheme';
import type { StrictTheme } from './types';

export interface ThemeContextType {
  theme: StrictTheme;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: createTheme(),
});
