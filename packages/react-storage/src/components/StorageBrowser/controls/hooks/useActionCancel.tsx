import { ActionCancelProps } from '../../composables/ActionCancel';
import { useControlsContext } from '../../controls/context';

export type UseActionCancel = () => {
  props?: ActionCancelProps;
};

export const useActionCancel: UseActionCancel = () => {
  const { data, actionsConfig } = useControlsContext();
  const { taskCounts } = data;
  let disabled = actionsConfig.actionCancel?.disabled;
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
      onClick: actionsConfig.actionCancel?.onClick,
      ariaLabel: actionsConfig.actionCancel?.ariaLabel,
      disabled,
      text: actionsConfig.actionCancel?.text,
    },
  };
};
