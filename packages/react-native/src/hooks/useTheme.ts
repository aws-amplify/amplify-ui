import * as React from 'react';

import { ThemeContext } from '../ThemeProvider/ThemeContext';
import { StrictTheme } from '../theme';

export const useTheme = (): StrictTheme => {
  const context = React.useContext(ThemeContext);
  return context.theme;
};
