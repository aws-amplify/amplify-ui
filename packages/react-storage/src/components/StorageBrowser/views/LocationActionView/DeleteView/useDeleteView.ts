/* eslint-disable no-console */
import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import type { FileDataItem, LocationItemData } from '../../../actions';
import { useLocationItems } from '../../../locationItems';
import { useStore } from '../../../store';
import type { Task } from '../../../tasks';
import { useAction } from '../../../useAction';
import { useGetActionInput } from '../../../configuration/context';
import { countFilesInFolder } from '../../utils/tableResolvers/countFilesInFolder';

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
  const getConfig = useGetActionInput();

  const [itemsWithCount, setItemsWithCount] = React.useState(fileDataItems);

  const [processState, handleProcess] = useAction('delete', {
    items: itemsWithCount,
  });
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const { isProcessing, isProcessingComplete, statusCounts, tasks } =
    processState;

  // Cast to LocationItemData to access type property properly
  const items = fileDataItems as unknown as LocationItemData[];
  const hasFolders = items.some((item) => item.type === 'FOLDER');
  console.log('[counter] items', items);
  console.log('[counter] itemsWithCount', itemsWithCount);
  console.log('[counter] tasks', tasks);

  // Initialize totalCount for folder items
  React.useEffect(() => {
    const initializeFolderCounts = async () => {
      console.log('[counter] Initializing folder counts calling it');

      if (!hasFolders || !current) {
        setItemsWithCount(fileDataItems);
        return;
      }

      console.log('[counter] Initializing folder counts executing it it');

      const enhancedItems = await Promise.all(
        fileDataItems.map(async (item) => {
          const locationItem = item as unknown as LocationItemData;
          if (locationItem.type === 'FOLDER') {
            try {
              const config = getConfig(current);
              const totalCount = await countFilesInFolder(
                locationItem.key,
                config
              );

              console.log(
                '[counter] Initializing folder counts totalCount',
                totalCount
              );
              return { ...item, totalCount };
            } catch (error) {
              console.log(
                '[counter] Initializing folder counts  Error counting files in folder for item',
                item,
                error
              );
              return { ...item, totalCount: 0 };
            }
          }
          return item;
        })
      );

      console.log(
        '[counter] Initializing folder counts... enhancedItems',
        enhancedItems
      );

      setItemsWithCount(enhancedItems);
    };

    initializeFolderCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileDataItems, hasFolders]);

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
