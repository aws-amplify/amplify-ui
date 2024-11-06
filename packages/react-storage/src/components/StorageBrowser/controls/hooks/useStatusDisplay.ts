import { StatusDisplayProps } from '../../composables/StatusDisplay';
import { useControlsContext } from '../../controls/context';
import { displayText } from '../../displayText/en';

export const useStatusDisplay = (): StatusDisplayProps => {
  const { data } = useControlsContext();
  const { taskCounts } = data;

  if (!taskCounts?.TOTAL) {
    return { statuses: [], total: 0 };
  }

  const statuses = [
    { name: displayText.statusDisplayCompleted, count: taskCounts.COMPLETE },
    { name: displayText.statusDisplayFailed, count: taskCounts.FAILED },
    { name: displayText.statusDisplayCanceled, count: taskCounts.CANCELED },
    { name: displayText.statusDisplayQueued, count: taskCounts.QUEUED },
  ];

  return { statuses, total: taskCounts.TOTAL };
};
