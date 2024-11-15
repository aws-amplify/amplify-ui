import React, { useState } from 'react';

import { isFunction } from '@aws-amplify/ui';

import { copyHandler, LocationData } from '../../../actions/handlers';
import { Task, useProcessTasks } from '../../../tasks';
import { useGetActionInput } from '../../../providers/configuration';
import { useStore } from '../../../providers/store';

import { CopyViewState, UseCopyViewOptions } from './types';
import { useFolders } from './useFolders';

export const useCopyView = (options?: UseCopyViewOptions): CopyViewState => {
  const { onExit } = options ?? {};
  const [
    {
      location,
      locationItems: { fileDataItems },
    },
    dispatchStoreAction,
  ] = useStore();
  const { current } = location;

  const getInput = useGetActionInput();

  const [processState, handleProcess] = useProcessTasks(
    copyHandler,
    fileDataItems,
    { concurrency: 4 }
  );

  const { isProcessing, isProcessingComplete, statusCounts, tasks } =
    processState;

  const [destination, setDestination] = useState(location);

  const onActionStart = () => {
    handleProcess({
      config: getInput(),
      destinationPrefix: destination.key,
    });
  };

  const onActionCancel = () => {
    tasks.forEach((task) => {
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onActionExit = () => {
    // clear files state
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(onExit)) onExit(current);
  };

  const onTaskRemove = React.useCallback(
    ({ data }: Task) => {
      dispatchStoreAction({ type: 'REMOVE_LOCATION_ITEM', id: data.id });
    },
    [dispatchStoreAction]
  );

  const folders = useFolders({ destination, setDestination });

  const onSelectDestination = (
    selectedDestination: LocationData,
    path?: string
  ) => {
    setDestination({
      current: selectedDestination,
      path: path ?? '',
      key: `${selectedDestination.prefix ?? ''}${path}`,
    });
  };

  return {
    destination,
    isProcessing,
    isProcessingComplete,
    folders,
    location,
    statusCounts,
    tasks,
    onActionCancel,
    onActionStart,
    onActionExit,
    onSelectDestination,
    onTaskRemove,
  };
};
