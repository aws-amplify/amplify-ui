import React from 'react';
import { isUndefined } from '@aws-amplify/ui';

import { UploadHandlerData } from '../../../actions';
import { FileItems, SelectionType, useStore } from '../../../providers';
import { Task } from '../../../tasks';
import { useAction } from '../../../useAction';
import { isFileTooBig } from '../../../validators';

import { UploadViewState, UseUploadViewOptions } from './types';
import { DEFAULT_OVERWRITE_ENABLED } from './constants';

interface FilesData {
  data: UploadHandlerData[];
  invalidFiles: FileItems | undefined;
}

export const useUploadView = (
  options?: UseUploadViewOptions
): UploadViewState => {
  const { onExit: _onExit, acceptedFileTypes } = options ?? {};

  const [{ files, location }, dispatchStoreAction] = useStore();
  const { current } = location;

  const [isOverwritingEnabled, setIsOverwritingEnabled] = React.useState(
    DEFAULT_OVERWRITE_ENABLED
  );

  const filesData = React.useMemo(
    () =>
      (files ?? [])?.reduce(
        (curr: FilesData, item) => {
          if (isFileTooBig(item.file)) {
            curr.invalidFiles = isUndefined(curr.invalidFiles)
              ? [item]
              : curr.invalidFiles.concat(item);
          } else {
            const parsedFileItem = {
              ...item,
              key: `${location.key}${item.key}`,
            };

            curr.data = curr.data.concat({
              ...parsedFileItem,
              preventOverwrite: !isOverwritingEnabled,
            });
          }

          return curr;
        },
        { invalidFiles: undefined, data: [] }
      ),
    [files, isOverwritingEnabled, location.key]
  );

  const { data, invalidFiles } = filesData;

  const [
    { isProcessing, isProcessingComplete, statusCounts, tasks },
    handleUploads,
  ] = useAction('upload', { items: data });

  const onDropFiles = (files: File[]) => {
    if (files) {
      dispatchStoreAction({ type: 'ADD_FILE_ITEMS', files });
    }
  };

  const onSelectFiles = (type?: 'FILE' | 'FOLDER') => {
    const selectionType = !acceptedFileTypes
      ? type
      : ([type, acceptedFileTypes.join()] as SelectionType);
    dispatchStoreAction({ type: 'SELECT_FILES', selectionType });
  };

  const onActionStart = () => {
    invalidFiles?.forEach((file) => {
      dispatchStoreAction({ type: 'REMOVE_FILE_ITEM', id: file.id });
    });

    handleUploads();
  };

  const onActionCancel = () => {
    tasks.forEach((task) => task.cancel?.());
  };

  const onActionExit = () => {
    // clear files state
    dispatchStoreAction({ type: 'RESET_FILE_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    _onExit?.(current);
  };

  const onToggleOverwrite = () => {
    setIsOverwritingEnabled((prev) => !prev);
  };

  const onTaskRemove = ({ data }: Task) => {
    dispatchStoreAction({ type: 'REMOVE_FILE_ITEM', id: data.id });
  };

  return {
    acceptedFileTypes,
    invalidFiles,
    isOverwritingEnabled,
    isProcessing,
    isProcessingComplete,
    location,
    onActionCancel,
    onActionExit,
    onActionStart,
    onDropFiles,
    onSelectFiles,
    onTaskRemove,
    onToggleOverwrite,
    statusCounts,
    tasks,
  };
};
