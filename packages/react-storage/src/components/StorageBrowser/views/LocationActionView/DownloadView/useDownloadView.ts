import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import type { FileDataItem } from '../../../actions';
import { usePaginationConfig } from '../../../configuration';
import type { Task } from '../../../tasks';
import { useLocationItems } from '../../../locationItems';
import { useStore } from '../../../store';
import { useAction } from '../../../useAction';
import { usePaginate } from '../../hooks/usePaginate';

import type { DownloadViewState, UseDownloadViewOptions } from './types';

// assign to constant to ensure referential equality
const EMPTY_ITEMS: FileDataItem[] = [];

export const useDownloadView = (
  options?: UseDownloadViewOptions
): DownloadViewState => {
  const { pageSize: configPageSize } = usePaginationConfig();
  const { onExit: _onExit, pageSize: propPageSize } = options ?? {};

  const pageSize = propPageSize ?? configPageSize;

  const [{ location }, storeDispatch] = useStore();
  const [locationItems, locationItemsDispatch] = useLocationItems();
  const { current } = location;
  const { fileDataItems: items = EMPTY_ITEMS } = locationItems;

  const [processState, handleProcess] = useAction('download', {
    items,
  });

  const { isProcessing, isProcessingComplete, statusCounts, tasks } =
    processState;

  const {
    currentPage: page,
    handlePaginate,
    highestPageVisited,
    pageItems: pageTasks,
  } = usePaginate({
    items: tasks,
    pageSize,
  });

  const hasNextPage = page * pageSize < tasks.length;

  const onActionStart = () => {
    if (!current) return;
    handleProcess();
  };

  const onActionCancel = () => {
    tasks.forEach((task) => {
      // Calling cancel on task works only on queued tasks.
      // In case of download, all download presigned url open at once
      // When certain threshold is reached for queuing inside StorageBrowser, cancel might be possible.
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
    hasNextPage,
    highestPageVisited,
    isProcessing,
    isProcessingComplete,
    location,
    onPaginate: handlePaginate,
    page,
    pageTasks,
    statusCounts,
    tasks,
    onActionCancel,
    onActionExit,
    onActionStart,
    onTaskRemove,
  };
};
