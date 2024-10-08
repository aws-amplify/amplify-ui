import React from 'react';

import { StatusDisplay } from '../composables/StatusDisplay';
import { ViewElement } from '../context/elements';
import { displayText } from '../displayText/en';
import { CancelableTask } from '../views/LocationActionView/useHandleUpload';
import { getTaskCounts } from './getTaskCounts';
import { ControlProps } from './types';

// FIXME: Temporarily get via props. Refactor later to get via view hook
interface TempProps extends ControlProps {
  actionType: 'BATCH' | 'SINGLE';
  isCancelable?: boolean;
  tasks: CancelableTask[];
}

export const StatusDisplayControl = ({
  className,
  actionType,
  isCancelable,
  tasks,
}: TempProps): React.JSX.Element | null => {
  if (actionType === 'SINGLE') {
    return null;
  }

  const counts = getTaskCounts(tasks);
  const statuses = [
    { name: displayText.statusDisplayCompleted, count: counts.COMPLETE },
    { name: displayText.statusDisplayFailed, count: counts.FAILED },
    { name: displayText.statusDisplayQueued, count: counts.QUEUED },
  ];

  if (isCancelable) {
    statuses.splice(2, 0, {
      name: displayText.statusDisplayCanceled,
      count: counts.CANCELED,
    });
  }

  return (
    <ViewElement className={className}>
      <StatusDisplay statuses={statuses} total={counts.TOTAL} />
    </ViewElement>
  );
};
