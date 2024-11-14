import React from 'react';

import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { OverwriteToggle } from '../composables/OverwriteToggle';
import { useOverwriteToggle } from './hooks/useOverwriteToggle';
import { ViewElement } from '../context/elements';

export const OverwriteToggleControl = ({
  className,
}: ControlProps): React.JSX.Element => {
  const props = useOverwriteToggle();
  const ResolvedOverwriteToggle = useResolvedComposable(
    OverwriteToggle,
    'OverwriteToggle'
  );

  return (
    <ViewElement className={className}>
      <ResolvedOverwriteToggle {...props} />
    </ViewElement>
  );
};
