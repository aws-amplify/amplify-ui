import * as React from 'react';

import type { WebTheme } from '@aws-amplify/ui';
import { createTheme } from '@aws-amplify/ui';
import type { ColorMode } from '../components/ThemeProvider/ThemeProvider';
import type { ThemeContextType } from '../components/ThemeProvider/ThemeContext';
import { ThemeContext } from '../components/ThemeProvider/ThemeContext';

/**
 * Get current Theme object value from Amplify context.
 * Returns a default theme if context is not available
 */
export const getThemeFromContext = (
  context: ThemeContextType
): ThemeContextType['theme'] => {
  if (typeof context === 'undefined' || typeof context.theme === 'undefined') {
    return createTheme();
  }

  return context.theme;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/theming)
 */
export const useTheme = (): WebTheme => {
  const context = React.useContext(ThemeContext);
  return getThemeFromContext(context);
};

/**
 * Internal use only
 */
export const useColorMode = (): ColorMode | undefined => {
  const context = React.useContext(ThemeContext);
  return context.colorMode;
};
