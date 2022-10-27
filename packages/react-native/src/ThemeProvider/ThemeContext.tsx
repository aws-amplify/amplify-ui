import * as React from 'react';
import { createReactNativeTheme, ReactNativeTheme } from '../theme';

export interface ThemeContextType {
  theme: ReactNativeTheme;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: createReactNativeTheme(),
});
