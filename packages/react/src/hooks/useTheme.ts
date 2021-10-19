import { useContext } from 'react';

import { Theme } from '@aws-amplify/ui';
import { AmplifyContext } from '../components/AmplifyProvider/AmplifyContext';

export const useTheme = (): Theme => {
  const { theme } = useContext(AmplifyContext);

  return theme;
};
