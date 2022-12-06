import * as React from 'react';

import { WebTheme } from '@aws-amplify/ui';

import { AmplifyContext } from '../components/ThemeProvider/AmplifyContext';
import { getThemeFromContext } from './useTheme';

interface UseAmplifyOutput {
  theme: WebTheme;
}

export function useAmplify(): UseAmplifyOutput {
  const context = React.useContext(AmplifyContext);
  const theme = getThemeFromContext(context);

  return { theme };
}
