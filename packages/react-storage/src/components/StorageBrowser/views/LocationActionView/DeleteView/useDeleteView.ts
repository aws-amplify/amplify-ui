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
      location,
      locationItems: { fileDataItems },
    },
    dispatchStoreAction,
  ] = useStore();
  const { current } = location;

  const getInput = useGetActionInput();

  const [{ tasks }, handleProcess] = useProcessTasks(
    deleteHandler,
    fileDataItems
  );

  const taskCounts = getTaskCounts(tasks);
  const { disableCancel, disableClose, disableStart } =
    getActionViewDisabledButtons(taskCounts);

  const onActionStart = () => {
    if (!current) return;
    handleProcess({ config: getInput() });
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
    disableStart,
    onActionCancel,
    onExit,
    onActionStart,
    taskCounts,
    tasks,
  };
};
