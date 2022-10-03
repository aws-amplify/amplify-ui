import * as React from 'react';
import { createReactNativeTheme, Theme } from '../theme';

export interface ThemeContextType {
  theme: Theme;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: createReactNativeTheme(),
});
