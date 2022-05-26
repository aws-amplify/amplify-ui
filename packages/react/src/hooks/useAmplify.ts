import * as React from 'react';

import { Theme } from '@aws-amplify/ui';

import { AmplifyContext } from '../components/AmplifyProvider/AmplifyContext';
import { getThemeFromContext } from './useTheme';

interface UseAmplifyOutput {
  theme: Theme;
}

export function useAmplify(): UseAmplifyOutput {
  const context = React.useContext(AmplifyContext);
  const theme = getThemeFromContext(context);

  return { theme };
}
