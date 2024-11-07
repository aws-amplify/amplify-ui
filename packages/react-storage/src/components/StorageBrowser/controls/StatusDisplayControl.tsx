import React from 'react';

import { StatusDisplay } from '../composables/StatusDisplay';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useStatusDisplay } from './hooks/useStatusDisplay';

export const StatusDisplayControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const props = useStatusDisplay();

  const ResolvedStatusDisplay = useResolvedComposable(
    StatusDisplay,
    'StatusDisplay'
  );

  return (
    <ViewElement className={className}>
      <ResolvedStatusDisplay {...props} />
    </ViewElement>
  );
};
