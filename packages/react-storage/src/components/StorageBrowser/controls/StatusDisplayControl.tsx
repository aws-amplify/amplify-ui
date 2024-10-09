import React from 'react';

import { StatusDisplay } from '../composables/StatusDisplay';
import { ViewElement } from '../context/elements';
import { displayText } from '../displayText/en';
import { ControlProps, StatusCounts } from './types';

// FIXME: Temporarily get via props. Refactor later to get via view hook
interface TempProps extends ControlProps {
  type: 'BATCH_ACTION' | 'SINGLE_ACTION';
  isCancelable?: boolean;
  statusCounts: StatusCounts;
}

export const StatusDisplayControl = ({
  className,
  type,
  isCancelable,
  statusCounts,
}: TempProps): React.JSX.Element | null => {
  if (type === 'SINGLE_ACTION') {
    return null;
  }

  const statuses = [
    { name: displayText.statusDisplayCompleted, count: statusCounts.COMPLETE },
    { name: displayText.statusDisplayFailed, count: statusCounts.FAILED },
    { name: displayText.statusDisplayQueued, count: statusCounts.QUEUED },
  ];

  if (isCancelable) {
    statuses.splice(2, 0, {
      name: displayText.statusDisplayCanceled,
      count: statusCounts.CANCELED,
    });
  }

  return (
    <ViewElement className={className}>
      <StatusDisplay statuses={statuses} total={statusCounts.TOTAL} />
    </ViewElement>
  );
};
