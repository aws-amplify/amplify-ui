import React from 'react';

import { Navigation } from '../composables/Navigation';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useNavigation } from './hooks/useNavigation';

export const NavigationControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const props = useNavigation();

  const ResolvedNavigation = useResolvedComposable(Navigation, 'Navigation');

  if (!props) {
    return null;
  }

  return (
    <ViewElement className={className}>
      <ResolvedNavigation {...props} />
    </ViewElement>
  );
};
