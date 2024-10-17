import React from 'react';

import { StatusDisplay } from '../composables/StatusDisplay';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';
import { resolveComposable } from './resolveComposable';
import { useStatusDisplay } from './hooks/useStatusDisplay';

export const StatusDisplayControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const { props } = useStatusDisplay();

  if (!props) {
    return null;
  }

  const { statuses, total } = props;

  const ResolvedStatusDisplay = resolveComposable(
    StatusDisplay,
    'StatusDisplay'
  );

  return (
    <ViewElement className={className}>
      <ResolvedStatusDisplay statuses={statuses} total={total} />
    </ViewElement>
  );
};
