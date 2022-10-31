import * as React from 'react';
import { ColorMode, createTheme, Theme } from '../theme';
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
    () => ({ theme: createTheme(theme, colorMode) }),
    [theme, colorMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
