import * as React from 'react';
import { createTheme, Theme } from '../theme';

export interface ThemeContextType {
  theme: Theme;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: createTheme(),
});
