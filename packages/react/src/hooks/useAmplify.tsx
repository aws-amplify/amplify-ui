import * as React from 'react';

import { AmplifyContext } from '../components/AmplifyProvider/AmplifyContext';
import * as primitives from '../primitives';

export function useAmplify() {
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
