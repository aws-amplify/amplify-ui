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
import type { ActionConfirmationModalProps } from '../../../components/composables/ActionConfirmationModal';

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

  // Initialize totalCount for folder items
  React.useEffect(() => {
    const initializeFolderCounts = async () => {
      if (!hasFolders || !current) {
        setItemsWithCount(fileDataItems);
        return;
      }

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

              return { ...item, totalCount, deletedCount: 0 };
            } catch (error) {
              return { ...item, totalCount: 0, deletedCount: 0 };
            }
          }
          return item;
        })
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

  // Create confirmation modal props
  const folders = items.filter((item) => item.type === 'FOLDER');
  const confirmationModal: ActionConfirmationModalProps = {
    isOpen: showConfirmation,
    title: 'Confirm Deletion',
    message: `The items that will be deleted contain ${folders.length} folder${
      folders.length !== 1 ? 's' : ''
    }`,
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    content: null,
  };

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
    onConfirmDelete,
    onCancelConfirmation,
    confirmationModal,
  };
};
