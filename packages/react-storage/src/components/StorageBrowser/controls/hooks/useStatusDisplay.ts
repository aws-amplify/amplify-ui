import { StatusDisplayProps } from '../../composables/StatusDisplay';
import { useControlsContext } from '../../controls/context';
import { displayText } from '../../displayText/en';

export const useStatusDisplay = (): StatusDisplayProps | null => {
  const { data, actionsConfig } = useControlsContext();
  const { taskCounts } = data;
  const { isCancelable, type } = actionsConfig ?? {};

  if (!taskCounts?.TOTAL || type !== 'BATCH_ACTION') {
    return null;
  }

  const statuses = [
    { name: displayText.statusDisplayCompleted, count: taskCounts.COMPLETE },
    { name: displayText.statusDisplayFailed, count: taskCounts.FAILED },
    { name: displayText.statusDisplayQueued, count: taskCounts.QUEUED },
  ];

  if (isCancelable) {
    statuses.splice(2, 0, {
      name: displayText.statusDisplayCanceled,
      count: taskCounts.CANCELED,
    });
  }

  return {
    statuses,
    total: taskCounts.TOTAL,
  };
};
