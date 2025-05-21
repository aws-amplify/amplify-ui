import React from 'react';

import type { UploadHandlerData } from '../../../actions';
import { useFileItems } from '../../../files';
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
  const [{ validItems, invalidItems: invalidFiles }, filesDispatch] =
    useFileItems();
  const { current } = location;

  const [isOverwritingEnabled, setIsOverwritingEnabled] = React.useState(
    DEFAULT_OVERWRITE_ENABLED
  );

  const items = React.useMemo(
    () =>
      (validItems ?? []).reduce((acc: UploadHandlerData[], item) => {
        acc.push({
          ...item,
          key: `${location.key}${item.key}`,
          preventOverwrite: !isOverwritingEnabled,
        });
        return acc;
      }, []),
    [validItems, isOverwritingEnabled, location.key]
  );

  const [
    { isProcessing, isProcessingComplete, statusCounts, tasks },
    handleUploads,
  ] = useAction('upload', { items });

  const onDropFiles = (files: File[]) => {
    if (files) {
      filesDispatch({ type: 'ADD_FILES', files });
    }
  };

  const onSelectFiles = (type?: 'FILE' | 'FOLDER') => {
    filesDispatch({ type: 'SELECT_FILES', selectionType: type });
  };

  const onActionStart = () => {
    handleUploads();
  };

  const onActionCancel = () => {
    tasks.forEach((task) => task.cancel?.());
  };

  const onActionExit = () => {
    // clear files state
    filesDispatch({ type: 'RESET_FILE_ITEMS' });
    // clear selected action
    storeDispatch({ type: 'RESET_ACTION_TYPE' });
    _onExit?.(current);
  };

  const onToggleOverwrite = () => {
    setIsOverwritingEnabled((prev) => !prev);
  };

  const onTaskRemove = ({ data }: Task) => {
    filesDispatch({ type: 'REMOVE_FILE_ITEM', id: data.id });
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
