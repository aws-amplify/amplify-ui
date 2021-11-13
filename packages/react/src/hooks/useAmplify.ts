import * as React from 'react';

import { Theme } from '@aws-amplify/ui';

import { AmplifyContext } from '../components/AmplifyProvider/AmplifyContext';
import * as primitives from '../primitives/components';

interface UseAmplifyOutput {
  components: typeof primitives;
  theme: Theme;
}

export function useAmplify(): UseAmplifyOutput {
  const context = React.useContext(AmplifyContext);
  const { components: customComponents, theme } = context;
  const components = React.useMemo(
    () => ({
      ...primitives,
      ...customComponents,
    }),
    [customComponents]
  );

  return { components, theme };
}
