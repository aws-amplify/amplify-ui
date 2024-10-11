import { StatusDisplayProps } from '../../composables/StatusDisplay';
import { useControlsContext } from '../../controls/context';
import { displayText } from '../../displayText/en';

export type UseStatusDisplay = () => {
  props?: StatusDisplayProps;
};

export const useStatusDisplay: UseStatusDisplay = () => {
  const { data, actionsConfig } = useControlsContext();
  const { taskCounts } = data;
  const { isCancelable, type } = actionsConfig;

  if (!taskCounts?.TOTAL || type !== 'BATCH_ACTION') {
    return {};
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
    props: {
      statuses,
      total: taskCounts.TOTAL,
    },
  };
};
