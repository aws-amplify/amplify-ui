import * as React from 'react';

import { Theme } from '@aws-amplify/ui';

import { ThemeContext } from '../components/ThemeProvider/ThemeContext';
import { getThemeFromContext } from './useTheme';

interface UseAmplifyOutput {
  theme: Theme;
}

export function useAmplify(): UseAmplifyOutput {
  const context = React.useContext(ThemeContext);
  const theme = getThemeFromContext(context);

  return { theme };
}
