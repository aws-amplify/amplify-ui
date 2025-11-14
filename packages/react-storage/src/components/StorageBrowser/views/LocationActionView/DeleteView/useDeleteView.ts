import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import type { FileDataItem, LocationItemData } from '../../../actions';
import { useLocationItems } from '../../../locationItems';
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

  const [{ location }, storeDispatch] = useStore();
  const [locationItems, locationItemsDispatch] = useLocationItems();
  const { current } = location;
  const { fileDataItems = EMPTY_ITEMS } = locationItems;

  const [processState, handleProcess] = useAction('delete', { items: fileDataItems });
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const { isProcessing, isProcessingComplete, statusCounts, tasks } =
    processState;

  // Cast to LocationItemData to access type property properly
  const items = fileDataItems as unknown as LocationItemData[];
  const hasFolders = items.some(item => item.type === 'FOLDER');

  const onActionStart = () => {
    if (!current) return;
    if (hasFolders) {
      setShowConfirmation(true);
    } else {
      handleProcess();
    }
  };

  const onConfirmDelete = () => {
    setShowConfirmation(false);
    handleProcess();
  };

  const onCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const onActionCancel = () => {
    tasks.forEach((task) => {
      // @TODO Fixme, calling cancel on task doesn't currently work
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
    showConfirmation,
    items,
    onActionCancel,
    onActionExit,
    onActionStart,
    onTaskRemove,
    onConfirmDelete,
    onCancelConfirmation,
  };
};
