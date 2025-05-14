import React, { useRef, useState } from 'react';
import { isFunction } from '@aws-amplify/ui';

import type { LocationData } from '../../../actions';
import { useLocationItems } from '../../../locationItems';
import { useStore } from '../../../store';
import type { Task } from '../../../tasks';
import { useAction } from '../../../useAction';

import type { CopyViewState, UseCopyViewOptions } from './types';
import { useFolders } from './useFolders';

export const useCopyView = (options?: UseCopyViewOptions): CopyViewState => {
  const { onExit } = options ?? {};
  const [{ location }, storeDispatch] = useStore();
  const [{ fileDataItems }, locationItemsDispatch] = useLocationItems();
  const idLookup = useRef<Record<string, string>>({});

  const [destination, setDestination] = useState(location);

  const data = React.useMemo(() => {
    idLookup.current = {};
    return fileDataItems?.map((item) => {
      // generate new `id` on each `destination.key` change to refresh
      // task data provided to `useActon`
      const id = crypto.randomUUID();
      idLookup.current[id] = item.id;
      return {
        ...item,
        id,
        key: `${destination.key}${item.fileKey}`,
        sourceKey: item.key,
      };
    });
  }, [destination.key, fileDataItems]);

  const folders = useFolders({ destination, setDestination });

  const [processState, handleProcess] = useAction('copy', { items: data! });

  const { isProcessing, isProcessingComplete, statusCounts, tasks } =
    processState;
  const { current } = location;
  const { onInitialize } = folders;

  // initial load
  React.useEffect(() => {
    onInitialize();
  }, [onInitialize]);

  const onActionStart = () => {
    handleProcess();
  };

  const onActionCancel = () => {
    tasks.forEach((task) => {
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onActionExit = () => {
    // clear files state
    locationItemsDispatch({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    storeDispatch({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(onExit)) onExit(current);
  };

  const onTaskRemove = React.useCallback(
    ({ data }: Task) => {
      locationItemsDispatch({
        type: 'REMOVE_LOCATION_ITEM',
        id: idLookup.current[data.id],
      });
    },
    [locationItemsDispatch]
  );

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
