import * as React from 'react';

import { createTheme, WebTheme } from '@aws-amplify/ui';
import {
  AmplifyContext,
  AmplifyContextType,
} from '../components/ThemeProvider/AmplifyContext';

/**
 * Get current Theme object value from Amplify context.
 * Returns a default theme if context is not available
 */
export const getThemeFromContext = (
  context: AmplifyContextType
): AmplifyContextType['theme'] => {
  if (typeof context === 'undefined' || typeof context.theme === 'undefined') {
    return createTheme();
  }

  return context.theme;
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/theming)
 */
export const useTheme = (): WebTheme => {
  const context = React.useContext(AmplifyContext);
  return getThemeFromContext(context);
};
