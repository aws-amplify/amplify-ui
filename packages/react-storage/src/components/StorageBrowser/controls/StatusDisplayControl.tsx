import React from 'react';

import { StatusDisplay } from '../composables/StatusDisplay';

import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useStatusDisplay } from './hooks/useStatusDisplay';

export const StatusDisplayControl = (): React.JSX.Element => {
  const props = useStatusDisplay();

  const Resolved = useResolvedComposable(StatusDisplay, 'StatusDisplay');

  return <Resolved {...props} />;
};
