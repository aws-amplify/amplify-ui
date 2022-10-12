import * as React from 'react';

import { ThemeContext } from '../ThemeProvider/ThemeContext';
import { ReactNativeTheme } from '../theme';

export const useTheme = (): ReactNativeTheme => {
  const context = React.useContext(ThemeContext);
  return context.theme;
};
