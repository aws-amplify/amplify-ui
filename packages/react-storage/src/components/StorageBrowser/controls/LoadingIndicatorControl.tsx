import React from 'react';

import { LoadingIndicator } from '../composables/LoadingIndicator';
import { ViewElement } from '../context/elements';
import { useLoadingIndicator } from './hooks/useLoadingIndicator';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ControlProps } from './types';

export const LoadingIndicatorControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const props = useLoadingIndicator();

  const Resolved = useResolvedComposable(LoadingIndicator, 'LoadingIndicator');

  return (
    <ViewElement className={className}>
      <Resolved {...props} />
    </ViewElement>
  );
};
