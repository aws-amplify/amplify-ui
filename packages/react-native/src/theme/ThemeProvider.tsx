import * as React from 'react';

import { createTheme } from './createTheme';
import type { ColorMode, Theme } from './types';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Theme;
  colorMode?: ColorMode;
}

export const ThemeProvider = ({
  children,
  theme,
  colorMode,
}: ThemeProviderProps): React.JSX.Element => {
  const value = React.useMemo(
    () => ({ theme: createTheme(theme, colorMode) }),
    [theme, colorMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
