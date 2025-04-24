import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import type { FileDataItem } from '../../../actions';
import { useFileDataItems } from '../../../fileDataItems';
import { useStore } from '../../../store';
import type { Task } from '../../../tasks';
import { useAction } from '../../../useAction';

import type { DeleteViewState, UseDeleteViewOptions } from './types';

// assign to constant to ensure referential equality
const EMPTY_ITEMS: FileDataItem[] = [];

export const useDeleteView = (
  options?: UseDeleteViewOptions
): DeleteViewState => {
  const { onExit: _onExit } = options ?? {};

  const [{ fileDataItems: items = EMPTY_ITEMS }, fileDataItemsDispatch] =
    useFileDataItems();

  const [{ location }, storeDispatch] = useStore();
  const { current } = location;

  const [processState, handleProcess] = useAction('delete', { items });

  const { isProcessing, isProcessingComplete, statusCounts, tasks } =
    processState;

  const onActionStart = () => {
    if (!current) return;
    handleProcess();
  };

  const onActionCancel = () => {
    tasks.forEach((task) => {
      // @TODO Fixme, calling cancel on task doesn't currently work
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onActionExit = () => {
    // clear files state
    fileDataItemsDispatch({ type: 'CLEAR_FILE_DATA_ITEMS' });
    // clear selected action
    storeDispatch({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(_onExit)) _onExit(current);
  };

  const onTaskRemove = React.useCallback(
    ({ data }: Task) => {
      fileDataItemsDispatch({ type: 'UNSELECT_FILE_DATA_ITEM', id: data.id });
    },
    [fileDataItemsDispatch]
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
