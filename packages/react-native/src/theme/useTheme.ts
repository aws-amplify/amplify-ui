import * as React from 'react';

import { ThemeContext } from './ThemeContext';
import type { StrictTheme } from './types';

export const useTheme = (): StrictTheme => {
  const context = React.useContext(ThemeContext);
  return context.theme;
};
