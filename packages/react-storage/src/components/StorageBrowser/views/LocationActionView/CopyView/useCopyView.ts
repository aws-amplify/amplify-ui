import React, { useRef, useState } from 'react';
import { isFunction } from '@aws-amplify/ui';

import { LocationData } from '../../../actions';
import { useStore } from '../../../providers/store';
import { Task } from '../../../tasks';
import { useAction } from '../../../useAction';

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
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(onExit)) onExit(current);
  };

  const onTaskRemove = React.useCallback(
    ({ data }: Task) => {
      dispatchStoreAction({
        type: 'REMOVE_LOCATION_ITEM',
        id: idLookup.current[data.id],
      });
    },
    [dispatchStoreAction]
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
