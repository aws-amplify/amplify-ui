import * as React from 'react';

import { Theme } from '@aws-amplify/ui';

import { AmplifyContext } from '../components/AmplifyProvider/AmplifyContext';

interface UseAmplifyOutput {
  theme: Theme;
}

export function useAmplify(): UseAmplifyOutput {
  const context = React.useContext(AmplifyContext);
  const { theme } = context;

  return { theme };
}
