import React from 'react';

import { StatusDisplay } from '../composables/StatusDisplay';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useStatusDisplay } from './hooks/useStatusDisplay';

export const StatusDisplayControl = (): React.JSX.Element | null => {
  const props = useStatusDisplay();

  const ResolvedStatusDisplay = useResolvedComposable(
    StatusDisplay,
    'StatusDisplay'
  );

  return <ResolvedStatusDisplay {...props} />;
};
