import * as React from 'react';

import { defaultTheme, WebTheme } from '@aws-amplify/ui';
import { AmplifyContext } from '../components/AmplifyProvider/AmplifyContext';

export const useTheme = (): WebTheme => {
  const context = React.useContext(AmplifyContext);

  if (typeof context === 'undefined' || typeof context.theme === 'undefined') {
    return defaultTheme;
  }

  return context.theme;
};
