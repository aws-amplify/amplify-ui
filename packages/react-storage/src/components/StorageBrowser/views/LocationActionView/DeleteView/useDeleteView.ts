import { DeleteViewState } from './types';

import { isFunction } from '@aws-amplify/ui';

import { LocationData, deleteHandler } from '../../../actions/handlers';
import { getTaskCounts } from '../../../controls/getTaskCounts';
import { useStore } from '../../../providers/store';
import { useGetActionInput } from '../../../providers/configuration';
import { useProcessTasks } from '../../../tasks';
import { getActionViewDisabledButtons } from '../utils';

export const useDeleteView = ({
  onExit: _onExit,
}: {
  onExit?: (location: LocationData) => void;
}): DeleteViewState => {
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
    deleteHandler,
    // @ts-expect-error
    selected,
    {
      concurrency: 1,
    }
  );

  const taskCounts = getTaskCounts(tasks);
  const { disableCancel, disableClose, disablePrimary } =
    getActionViewDisabledButtons(taskCounts);

  const onActionStart = () => {
    if (!current?.prefix) return;
    handleProcess({
      config: getInput(),
      prefix: current.prefix,
    });
  };

  const onActionCancel = () => {
    tasks.forEach((task) => {
      // @TODO Fixme, calling cancel on task doesn't currently work
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onExit = () => {
    // clear files state
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(_onExit)) _onExit(current!);
  };

  return {
    disableCancel,
    disableClose,
    disablePrimary,
    onActionCancel,
    onExit,
    onActionStart,
    taskCounts,
    tasks,
  };
};
