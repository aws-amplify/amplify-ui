import { isFunction } from '@aws-amplify/ui';

import { deleteHandler } from '../../../actions/handlers';
import { getTaskCounts } from '../../../controls/getTaskCounts';
import { useStore } from '../../../providers/store';
import { useGetActionInput } from '../../../providers/configuration';
import { useProcessTasks } from '../../../tasks';
import { UseActionView } from './types';
import { getActionViewDisabledButtons } from '../utils';

interface UseDeleteActionView extends UseActionView {}

export const useDeleteActionView = ({
  onClose: _onClose,
}: {
  onClose?: () => void;
}): UseDeleteActionView => {
  const [
    {
      history,
      locationItems: { fileDataItems: selected },
    },
    dispatchStoreAction,
  ] = useStore();
  const { current } = history;

  const getInput = useGetActionInput();

  const [tasks, handleProcess] = useProcessTasks(
    // @ts-expect-error
    deleteHandler,
    selected,
    {
      concurrency: 1,
    }
  );

  const taskCounts = getTaskCounts(tasks);
  const { disableCancel, disableClose, disablePrimary } =
    getActionViewDisabledButtons(taskCounts);

  const onStart = () => {
    if (!current?.prefix) return;
    handleProcess({
      config: getInput(),
      prefix: current.prefix,
    });
  };

  const onCancel = () => {
    tasks.forEach((task) => {
      // @TODO Fixme, calling cancel on task doesn't currently work
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onClose = () => {
    // clear files state
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(_onClose)) _onClose();
  };

  return {
    disableCancel,
    disableClose,
    disablePrimary,
    onCancel,
    onClose,
    onStart,
    taskCounts,
    tasks,
  };
};
