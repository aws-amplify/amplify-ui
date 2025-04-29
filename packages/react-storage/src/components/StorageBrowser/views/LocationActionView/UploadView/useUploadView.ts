import React from 'react';

import type { UploadHandlerData } from '../../../actions';
import { useFiles } from '../../../files';
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
  const [{ items: fileItems, invalidFiles }, filesDispatch] = useFiles();
  const { current } = location;

  const [isOverwritingEnabled, setIsOverwritingEnabled] = React.useState(
    DEFAULT_OVERWRITE_ENABLED
  );

  const filesData = React.useMemo(
    () =>
      (fileItems ?? []).reduce((curr: UploadHandlerData[], item) => {
        const parsedFileItem = {
          ...item,
          key: `${location.key}${item.key}`,
        };

        return curr.concat({
          ...parsedFileItem,
          preventOverwrite: !isOverwritingEnabled,
        });
      }, []),
    [fileItems, isOverwritingEnabled, location.key]
  );

  const [
    { isProcessing, isProcessingComplete, statusCounts, tasks },
    handleUploads,
  ] = useAction('upload', { items: filesData });

  const onDropFiles = (files: File[]) => {
    if (files) {
      filesDispatch({ type: 'ADD_FILE_ITEMS', files });
    }
  };

  const onSelectFiles = (type?: 'FILE' | 'FOLDER') => {
    filesDispatch({ type: 'SELECT_FILES', selectionType: type });
  };

  const onActionStart = () => handleUploads();

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
