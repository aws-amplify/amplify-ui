import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import type { FileDataItem } from '../../../actions';
import type { Task } from '../../../tasks';
import { useLocationItems } from '../../../locationItems';
import { useStore } from '../../../store';
import { useAction } from '../../../useAction';

import type { DownloadViewState, UseDownloadViewOptions } from './types';

// assign to constant to ensure referential equality
const EMPTY_ITEMS: FileDataItem[] = [];

export const useDownloadView = (
  options?: UseDownloadViewOptions
): DownloadViewState => {
  const { onExit: _onExit } = options ?? {};

  const [{ location }, storeDispatch] = useStore();
  const [locationItems, locationItemsDispatch] = useLocationItems();
  const { current } = location;
  const { fileDataItems: items = EMPTY_ITEMS } = locationItems;

  const [processState, handleProcess] = useAction('download', {
    items,
  });

  const { isProcessing, isProcessingComplete, statusCounts, tasks } =
    processState;

  const onActionStart = () => {
    if (!current) return;
    handleProcess();
  };

  const onActionCancel = () => {
    tasks.forEach((task) => {
      // Calling cancel on task works only on queued tasks.
      // In case of download, all download presigned url open at once so this does not really work
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onActionExit = () => {
    // clear files state
    locationItemsDispatch({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    storeDispatch({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(_onExit)) _onExit(current);
  };

  const onTaskRemove = React.useCallback(
    ({ data }: Task) => {
      locationItemsDispatch({ type: 'REMOVE_LOCATION_ITEM', id: data.id });
    },
    [locationItemsDispatch]
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
