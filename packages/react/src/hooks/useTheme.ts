import { useContext } from 'react';

import { WebTheme } from '@aws-amplify/ui';
import { AmplifyContext } from '../components/AmplifyProvider/AmplifyContext';

export const useTheme = (): WebTheme => {
  const { theme } = useContext(AmplifyContext);

  return theme;
};
