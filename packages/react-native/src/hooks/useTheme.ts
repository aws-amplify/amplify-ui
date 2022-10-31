import * as React from 'react';

import { ThemeContext } from '../ThemeProvider/ThemeContext';
import { Theme } from '../theme';

export const useTheme = (): Theme => {
  const context = React.useContext(ThemeContext);
  return context.theme;
};
