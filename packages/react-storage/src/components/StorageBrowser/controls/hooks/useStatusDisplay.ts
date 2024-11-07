import { StatusDisplayProps } from '../../composables/StatusDisplay';
import { useControlsContext } from '../../controls/context';
import { displayText } from '../../displayText/en';

export const useStatusDisplay = (): StatusDisplayProps => {
  const { data } = useControlsContext();
  const { statusCounts } = data;

  if (!statusCounts?.TOTAL) {
    return { statuses: [], total: 0 };
  }

  const statuses = [
    { name: displayText.statusDisplayCompleted, count: statusCounts.COMPLETE },
    { name: displayText.statusDisplayFailed, count: statusCounts.FAILED },
    { name: displayText.statusDisplayCanceled, count: statusCounts.CANCELED },
    { name: displayText.statusDisplayQueued, count: statusCounts.QUEUED },
  ];

  return { statuses, total: statusCounts.TOTAL };
};
