import { isFunction } from '@aws-amplify/ui';

import { DeleteViewState, UseDeleteViewOptions } from './types';
import { deleteHandler } from '../../../actions/handlers';
import { useStore } from '../../../providers/store';
import { useGetActionInput } from '../../../providers/configuration';
import { Task, useProcessTasks } from '../../../tasks';
import React from 'react';

export const useDeleteView = (
  options?: UseDeleteViewOptions
): DeleteViewState => {
  const { onExit: _onExit } = options ?? {};

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

  const onActionExit = () => {
    // clear files state
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(_onExit)) _onExit(current);
  };

  const onTaskRemove = React.useCallback(
    ({ data }: Task) => {
      dispatchStoreAction({ type: 'REMOVE_LOCATION_ITEM', id: data.id });
    },
    [dispatchStoreAction]
  );

  return {
    isProcessing,
    isProcessingComplete,
    location,
    statusCounts,
    tasks,
    onActionCancel,
    onActionExit,
    onActionStart,
    onTaskRemove,
  };
};
