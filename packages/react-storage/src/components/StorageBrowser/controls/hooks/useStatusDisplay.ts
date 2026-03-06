import type { StatusDisplayProps } from '../../components/composables/StatusDisplay';
import { useControlsContext } from '../context';

export const useStatusDisplay = (): StatusDisplayProps => {
  const { data } = useControlsContext();
  const {
    statusCounts,
    statusDisplayCanceledLabel,
    statusDisplayCompletedLabel,
    statusDisplayFailedLabel,
    statusDisplayQueuedLabel,
  } = data;

  if (!statusCounts?.TOTAL) {
    return { statuses: [], total: 0 };
  }

  const statuses = [
    { name: statusDisplayCompletedLabel ?? '', count: statusCounts.COMPLETE },
    { name: statusDisplayFailedLabel ?? '', count: statusCounts.FAILED },
    { name: statusDisplayCanceledLabel ?? '', count: statusCounts.CANCELED },
    { name: statusDisplayQueuedLabel ?? '', count: statusCounts.QUEUED },
  ];

  return { statuses, total: statusCounts.TOTAL };
};
