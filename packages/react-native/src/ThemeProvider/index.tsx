import * as React from 'react';
import { ColorMode, createReactNativeTheme, Theme } from '../theme';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
  colorMode?: ColorMode;
  theme?: Theme;
}

export const ThemeProvider = ({
  children,
  colorMode,
  theme,
}: ThemeProviderProps): JSX.Element => {
  const value = React.useMemo(
    () => ({ theme: createReactNativeTheme(theme, colorMode) }),
    [theme, colorMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
