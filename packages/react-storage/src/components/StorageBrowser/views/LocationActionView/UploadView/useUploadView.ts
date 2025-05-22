import React from 'react';

import type { UploadHandlerData } from '../../../actions';
import { useFileItems } from '../../../fileItems';
import { useStore } from '../../../store';
import type { Task } from '../../../tasks';
import { useAction } from '../../../useAction';

import { DEFAULT_OVERWRITE_ENABLED } from './constants';
import type { UploadViewState, UseUploadViewOptions } from './types';

export const useUploadView = (
  options?: UseUploadViewOptions
): UploadViewState => {
  const { onExit: _onExit } = options ?? {};

  const [{ location }, storeDispatch] = useStore();
  const [{ validItems, invalidItems: invalidFiles }, fileItemsDispatch] =
    useFileItems();
  const { current } = location;

  const [isOverwritingEnabled, setIsOverwritingEnabled] = React.useState(
    DEFAULT_OVERWRITE_ENABLED
  );

  const items: UploadHandlerData[] = React.useMemo(
    () =>
      (validItems ?? []).map((item) => ({
        ...item,
        key: `${location.key}${item.key}`,
        preventOverwrite: !isOverwritingEnabled,
      })),
    [validItems, isOverwritingEnabled, location.key]
  );

  const [
    { isProcessing, isProcessingComplete, statusCounts, tasks },
    handleUploads,
  ] = useAction('upload', { items });

  const onDropFiles = (files: File[]) => {
    if (files) {
      fileItemsDispatch({ type: 'ADD_FILES', files });
    }
  };

  const onSelectFiles = (type?: 'FILE' | 'FOLDER') => {
    fileItemsDispatch({ type: 'SELECT_FILES', selectionType: type });
  };

  const onActionStart = () => {
    handleUploads();
  };

  const onActionCancel = () => {
    tasks.forEach((task) => task.cancel?.());
  };

  const onActionExit = () => {
    // clear files state
    fileItemsDispatch({ type: 'RESET_FILE_ITEMS' });
    // clear selected action
    storeDispatch({ type: 'RESET_ACTION_TYPE' });
    _onExit?.(current);
  };

  const onToggleOverwrite = () => {
    setIsOverwritingEnabled((prev) => !prev);
  };

  const onTaskRemove = ({ data }: Task) => {
    fileItemsDispatch({ type: 'REMOVE_FILE_ITEM', id: data.id });
  };

  return {
    isProcessing,
    isProcessingComplete,
    isOverwritingEnabled,
    location,
    invalidFiles,
    statusCounts,
    tasks,
    onActionCancel,
    onActionExit,
    onActionStart,
    onDropFiles,
    onTaskRemove,
    onSelectFiles,
    onToggleOverwrite,
  };
};
