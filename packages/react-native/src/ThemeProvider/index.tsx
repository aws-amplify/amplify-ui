import * as React from 'react';
import { createTheme, Theme } from '../theme';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Theme;
}

export const ThemeProvider = ({
  children,
  theme,
}: ThemeProviderProps): JSX.Element => {
  const value = React.useMemo(() => ({ theme: createTheme(theme) }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
