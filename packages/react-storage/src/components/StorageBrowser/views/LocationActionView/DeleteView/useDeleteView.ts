import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import type { LocationItemData } from '../../../actions';
import { useLocationItems } from '../../../locationItems/context';
import { getSelectionSummary } from '../../../locationItems/utils';
import { useStore } from '../../../store';
import type { Task } from '../../../tasks';
import { useAction } from '../../../useAction';
import { useGetActionInput } from '../../../configuration/context';
import { useDisplayText } from '../../../displayText';

import type { DeleteViewState, UseDeleteViewOptions } from './types';
import {
  countFilesInFolder,
  createDeleteConfirmationModalProps,
} from './utils';

// assign to constant to ensure referential equality
const EMPTY_ITEMS: LocationItemData[] = [];

export const useDeleteView = (
  options?: UseDeleteViewOptions
): DeleteViewState => {
  const { onExit: _onExit } = options ?? {};
  const { DeleteView: displayText } = useDisplayText();

  const [{ location }, storeDispatch] = useStore();
  const [locationItems, locationItemsDispatch] = useLocationItems();
  const { current } = location;
  const { dataItems = EMPTY_ITEMS } = locationItems;
  const getConfig = useGetActionInput();

  const [itemsWithCount, setItemsWithCount] = React.useState(dataItems);
  const folderCountsRef = React.useRef<Map<string, number | string | null>>(
    new Map()
  );

  // Sync itemsWithCount with dataItems when dataItems changes (e.g., item removal)
  React.useEffect(() => {
    const itemsWithAppliedCounts = dataItems.map((item) => ({
      ...item,
      totalCount: folderCountsRef.current.get(item.id),
    }));
    setItemsWithCount(itemsWithAppliedCounts);
  }, [dataItems]);

  const [processState, handleProcess] = useAction('delete', {
    items: itemsWithCount,
  });
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const { isProcessing, isProcessingComplete, statusCounts, tasks } =
    processState;

  const selectionSummary = getSelectionSummary(dataItems);
  const { hasFolders } = selectionSummary;

  React.useEffect(() => {
    const initializeFolderCounts = async () => {
      if (!selectionSummary.hasFolders || !current) {
        return;
      }
      const config = getConfig(current);

      const foldersToCount = dataItems.filter(
        (item) =>
          item.type === 'FOLDER' && !folderCountsRef.current.has(item.id)
      );

      if (foldersToCount.length === 0) {
        return;
      }

      await Promise.all(
        foldersToCount.map(async (folder) => {
          try {
            const totalCount = await countFilesInFolder(folder.key, config);
            folderCountsRef.current.set(folder.id, totalCount);
          } catch (error) {
            folderCountsRef.current.set(folder.id, null);
          }
        })
      );

      setItemsWithCount((currentItems) =>
        currentItems.map((item) => ({
          ...item,
          totalCount: folderCountsRef.current.get(item.id),
        }))
      );
    };

    initializeFolderCounts();
  }, [current, getConfig, selectionSummary.hasFolders, dataItems]);

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

  const confirmationModal = React.useMemo(
    () =>
      createDeleteConfirmationModalProps({
        items: dataItems,
        showConfirmation,
        displayText,
      }),
    [dataItems, showConfirmation, displayText]
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
    onConfirmDelete,
    onCancelConfirmation,
    confirmationModal,
  };
};
