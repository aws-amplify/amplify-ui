import React from 'react';

import { Navigation } from '../components/composables/Navigation';

import { useNavigation } from './hooks/useNavigation';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const NavigationControl = (): React.JSX.Element => {
  const props = useNavigation();

  const Resolved = useResolvedComposable(Navigation, 'Navigation');

  return <Resolved {...props} />;
};
