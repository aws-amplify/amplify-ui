import React from 'react';

import { LoadingIndicator } from '../components/composables/LoadingIndicator';

import { useLoadingIndicator } from './hooks/useLoadingIndicator';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const LoadingIndicatorControl = (): React.JSX.Element => {
  const props = useLoadingIndicator();

  const Resolved = useResolvedComposable(LoadingIndicator, 'LoadingIndicator');

  return <Resolved {...props} />;
};
