import { isFunction } from '@aws-amplify/ui';

import { FileDataItem } from '../../../actions';
import { useLocationItems } from '../../../locationItems';
import { useStore } from '../../../store';
import { useAction } from '../../../useAction';

import { DownloadViewState, UseDownloadViewOptions } from './types';

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

  return {
    isProcessing,
    isProcessingComplete,
    location,
    statusCounts,
    tasks,
    onActionCancel,
    onActionExit,
    onActionStart,
  };
};
