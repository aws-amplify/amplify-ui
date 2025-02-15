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
  invalidFiles: File[] | undefined;
}

export const useUploadView = (
  options?: UseUploadViewOptions
): UploadViewState => {
  const { onExit: _onExit, acceptedFileTypes } = options ?? {};

  const [{ fileItems, location }, dispatch] = useStore();
  const { current } = location;

  const [isOverwritingEnabled, setIsOverwritingEnabled] = React.useState(
    DEFAULT_OVERWRITE_ENABLED
  );

  const filesData = React.useMemo(
    () =>
      (fileItems.items ?? []).reduce(
        (prevData: FilesData, item) => {
          // if (isFileTooBig(item.file)) {
          //   curr.invalidFiles = isUndefined(curr.invalidFiles)
          //     ? [item]
          //     : curr.invalidFiles.concat(item);
          // } else {
          const parsedFileItem = {
            ...item,
            key: `${location.key}${item.key}`,
          };

          // }

          const data = prevData.data.concat({
            ...parsedFileItem,
            preventOverwrite: !isOverwritingEnabled,
          });

          return { ...prevData, data };
        },
        { invalidFiles: fileItems.invalidFiles ?? [], data: [] }
      ),
    [fileItems, isOverwritingEnabled, location.key]
  );

  const { data, invalidFiles } = filesData;

  const [
    { isProcessing, isProcessingComplete, statusCounts, tasks },
    handleUploads,
  ] = useAction('upload', { items: data });

  const onDropFiles = (files: File[]) => {
    dispatch({ type: 'ADD_FILE_ITEMS', files });
  };

  const onSelectFiles = (type?: 'FILE' | 'FOLDER') => {
    const selectionType = !acceptedFileTypes
      ? type
      : ([type, acceptedFileTypes.join()] as SelectionType);
    dispatch({ type: 'SELECT_FILES', selectionType });
  };

  const onActionStart = () => {
    invalidFiles?.forEach((file) => {
      dispatch({ type: 'REMOVE_FILE_ITEM', id: file.id });
    });

    handleUploads();
  };

  const onActionCancel = () => {
    tasks.forEach((task) => task.cancel?.());
  };

  const onActionExit = () => {
    // clear files state
    dispatch({ type: 'RESET_FILE_ITEMS' });
    // clear selected action
    dispatch({ type: 'RESET_ACTION_TYPE' });
    _onExit?.(current);
  };

  const onToggleOverwrite = () => {
    setIsOverwritingEnabled((prev) => !prev);
  };

  const onTaskRemove = ({ data }: Task) => {
    dispatch({ type: 'REMOVE_FILE_ITEM', id: data.id });
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
