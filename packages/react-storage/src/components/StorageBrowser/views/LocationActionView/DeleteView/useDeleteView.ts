import { DeleteViewState } from './types';

import { isFunction } from '@aws-amplify/ui';

import { LocationData, deleteHandler } from '../../../actions/handlers';
import { useStore } from '../../../providers/store';
import { useGetActionInput } from '../../../providers/configuration';
import { useProcessTasks } from '../../../tasks';

export const useDeleteView = (params?: {
  onExit?: (location: LocationData) => void;
}): DeleteViewState => {
  const { onExit: _onExit } = params ?? {};

  const [{ location, locationItems }, dispatchStoreAction] = useStore();
  const { fileDataItems } = locationItems;
  const { current } = location;

  const getInput = useGetActionInput();

  const [processState, handleProcess] = useProcessTasks(
    deleteHandler,
    fileDataItems,
    { concurrency: 4 }
  );

  const { isProcessing, isProcessingComplete, statusCounts, tasks } =
    processState;

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
    // clear tasks state
    tasks.forEach(({ remove }) => remove());
    // clear files state
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(_onExit)) _onExit(current!);
  };

  return {
    isProcessing,
    isProcessingComplete,
    onActionCancel,
    onActionStart,
    onExit,
    statusCounts,
    tasks,
  };
};
