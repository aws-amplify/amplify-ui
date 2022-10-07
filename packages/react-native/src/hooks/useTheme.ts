import * as React from 'react';

import { ThemeContext, ThemeContextType } from '../ThemeProvider/ThemeContext';
import { createReactNativeTheme, Theme } from '../theme';

/**
 * Get current Theme object value from context.
 * Returns a default theme if context is not available
 */
export const getThemeFromContext = (
  context: ThemeContextType
): ThemeContextType['theme'] => {
  if (typeof context === 'undefined' || typeof context.theme === 'undefined') {
    return createReactNativeTheme();
  }

  return context.theme;
};

export const useTheme = (): Theme => {
  const context = React.useContext(ThemeContext);
  return getThemeFromContext(context);
};
