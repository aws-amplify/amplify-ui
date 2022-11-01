import * as React from 'react';
import { createTheme, StrictTheme } from '../theme';

export interface ThemeContextType {
  theme: StrictTheme;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: createTheme(),
});
