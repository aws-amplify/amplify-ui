import * as React from 'react';

import { defaultTheme, WebTheme } from '@aws-amplify/ui';
import {
  ThemeContext,
  ThemeContextType,
} from '../components/ThemeProvider/ThemeContext';

export const useTheme = (): WebTheme => {
  const context = React.useContext(ThemeContext);
  return getThemeFromContext(context);
};

/**
 * Get current Theme object value from Amplify context.
 * Returns a default theme if context is not available
 */
export const getThemeFromContext = (context: ThemeContextType) => {
  if (typeof context === 'undefined' || typeof context.theme === 'undefined') {
    return defaultTheme;
  }

  return context.theme;
};
