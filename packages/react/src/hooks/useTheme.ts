import * as React from 'react';

import { WebTheme } from '@aws-amplify/ui';
import { AmplifyContext } from '../components/AmplifyProvider/AmplifyContext';

export const useTheme = (): WebTheme => {
  const { theme } = React.useContext(AmplifyContext);
  return theme;
};
