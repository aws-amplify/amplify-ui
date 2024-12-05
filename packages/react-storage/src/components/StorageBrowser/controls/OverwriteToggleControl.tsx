import React from 'react';

import { OverwriteToggle } from '../composables/OverwriteToggle';

import { useOverwriteToggle } from './hooks/useOverwriteToggle';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const OverwriteToggleControl = (): React.JSX.Element => {
  const props = useOverwriteToggle();
  const Resolved = useResolvedComposable(OverwriteToggle, 'OverwriteToggle');

  return <Resolved {...props} />;
};
