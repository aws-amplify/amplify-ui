import { StatusDisplayProps } from '../../composables/StatusDisplay';
import { useControlsContext } from '../../controls/context';
import { displayText } from '../../displayText/en';

export const useStatusDisplay = (): StatusDisplayProps | null => {
  const { data, actionsConfig } = useControlsContext();
  const { statusCounts } = data;
  const { isCancelable, type } = actionsConfig ?? {};

  if (!statusCounts?.TOTAL || type !== 'BATCH_ACTION') {
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

  return {
    statuses,
    total: statusCounts.TOTAL,
  };
};
