import { ActionStartProps } from '../../composables/ActionStart';
import { useControlsContext } from '../../controls/context';

export type UseActionStart = () => {
  props?: ActionStartProps;
};

export const useActionStart: UseActionStart = () => {
  const { data, actionsConfig } = useControlsContext();
  const { taskCounts } = data;
  let disabled = actionsConfig.actionStart?.disabled;
  if (disabled === undefined && taskCounts) {
    const hasStarted = !!taskCounts.PENDING;
    const hasCompleted =
      !!taskCounts.TOTAL &&
      taskCounts.CANCELED + taskCounts.COMPLETE + taskCounts.FAILED ===
        taskCounts.TOTAL;

    disabled = !taskCounts.TOTAL || hasStarted || hasCompleted;
  }
  return {
    props: {
      disabled,
      onClick: actionsConfig.actionStart?.onClick,
      label: actionsConfig.actionStart?.label,
    },
  };
};
