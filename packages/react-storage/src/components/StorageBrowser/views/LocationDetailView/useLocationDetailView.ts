import React from 'react';

import { isFunction } from '@aws-amplify/ui';

import type {
  DownloadHandlerData,
  FileDataItem,
  FileData,
  LocationData,
} from '../../actions';
import { useActionConfigs } from '../../actions';
import { useFiles } from '../../files';
import { useFileDataItems } from '../../fileDataItems';
import { useStore } from '../../store';
import { useAction } from '../../useAction';

import { useLocationItems } from '../../locationItems';

import type { Task } from '../../tasks';

import type {
  LocationDetailViewState,
  UseLocationDetailViewOptions,
} from './types';

export const DEFAULT_LIST_OPTIONS = { delimiter: '/', pageSize: 100 };
const INITIAL_SEARCH_VALUES = {
  isSearchSubfoldersEnabled: false,
  searchQuery: '',
};

const getDownloadErrorMessageFromFailedDownloadTask = (
  task: Task<DownloadHandlerData> | undefined
): string | undefined => {
  if (!task) return;

  return `Failed to download ${
    task.data.fileKey ?? task.data.key
  } due to error: ${task.message}.`;
};

export const useLocationDetailView = (
  options?: UseLocationDetailViewOptions
): LocationDetailViewState => {
  const {
    initialValues: __,
    onExit,
    onNavigate,
    onActionSelect,
  } = options ?? {};

  // const listOptionsRef = React.useRef({
  //   ...DEFAULT_LIST_OPTIONS,
  //   ...initialValues,
  // });

  // const listOptions = listOptionsRef.current;

  const [searchValues, setSearchValues] = React.useState(INITIAL_SEARCH_VALUES);
  const resetSearchState = () => {
    setSearchValues(INITIAL_SEARCH_VALUES);
  };

  const [{ fileDataItems }, fileDataItemsDispatch] = useFileDataItems();
  const filesDispatch = useFiles()[1];

  const [{ location, actionType }, storeDispatch] = useStore();
  const { permissions } = location.current ?? {};

  const [
    { pageItems, isLoading, ...locationItemsState },
    locationItemsDispatch,
  ] = useLocationItems();

  const [{ task }, handleDownload] = useAction('download');

  const { actionConfigs } = useActionConfigs();

  const actionItems = React.useMemo(() => {
    if (!permissions) {
      return [];
    }

    return !actionConfigs
      ? []
      : Object.entries(actionConfigs).map(([type, { actionListItem }]) => {
          const { icon, hide, disable, label } = actionListItem ?? {};

          return {
            actionType: type,
            icon,
            isDisabled: isFunction(disable)
              ? disable(fileDataItems)
              : disable ?? false,
            isHidden: isFunction(hide) ? hide(permissions) : hide,
            label,
          };
        });
  }, [actionConfigs, fileDataItems, permissions]);

  return {
    ...searchValues,
    ...locationItemsState,
    actionItems,
    actionType,
    downloadErrorMessage: getDownloadErrorMessageFromFailedDownloadTask(task),
    fileDataItems,
    hasDownloadError: task?.status === 'FAILED',
    isLoading,
    pageItems,
    location,
    onRefresh: () => {
      locationItemsDispatch({ type: 'REFRESH' });
      fileDataItemsDispatch({ type: 'CLEAR_FILE_DATA_ITEMS' });
    },
    onPaginate: (page) => {
      locationItemsDispatch({ type: 'PAGINATE', page });
    },
    onActionExit: () => {
      storeDispatch({ type: 'RESET_ACTION_TYPE' });
    },
    onActionSelect: (nextActionType) => {
      onActionSelect?.(nextActionType);
      storeDispatch({
        type: 'CHANGE_ACTION_TYPE',
        actionType: nextActionType,
      });
    },
    onNavigate: (location: LocationData, path?: string) => {
      onNavigate?.(location, path);
      storeDispatch({ type: 'CHANGE_LOCATION', location, path });

      // clean up
      fileDataItemsDispatch({ type: 'CLEAR_FILE_DATA_ITEMS' });
      locationItemsDispatch({ type: 'RESET' });
      resetSearchState();
    },
    onDropFiles: (files: File[]) => {
      filesDispatch({ type: 'ADD_FILE_ITEMS', files });

      const actionType = 'upload';
      storeDispatch({ type: 'CHANGE_ACTION_TYPE', actionType });
      onActionSelect?.(actionType);
    },
    onDownload: (data: FileDataItem) => {
      handleDownload({ data });
    },
    onNavigateHome: () => {
      onExit?.();
      storeDispatch({ type: 'RESET_LOCATION' });
      locationItemsDispatch({ type: 'RESET' });
      storeDispatch({ type: 'RESET_ACTION_TYPE' });
      fileDataItemsDispatch({ type: 'CLEAR_FILE_DATA_ITEMS' });
    },
    onSelect: (isSelected: boolean, fileItem: FileData) => {
      fileDataItemsDispatch(
        isSelected
          ? { type: 'UNSELECT_FILE_DATA_ITEM', id: fileItem.id }
          : { type: 'SELECT_FILE_DATA_ITEMS', items: [fileItem] }
      );
    },
    onToggleSelectAll: () => {
      const fileItems = pageItems.filter(
        (item): item is FileData => item.type === 'FILE'
      );
      fileDataItemsDispatch(
        fileItems.length === fileDataItems?.length
          ? { type: 'CLEAR_FILE_DATA_ITEMS' }
          : { type: 'SELECT_FILE_DATA_ITEMS', items: fileItems }
      );
    },
    onSearch: () => {
      const {
        isSearchSubfoldersEnabled: includeSubfolders,
        searchQuery: value,
      } = searchValues;

      const query = { includeSubfolders, value };

      locationItemsDispatch({ type: 'SEARCH', query });
    },
    onSearchClear: () => {
      resetSearchState();
    },
    onSearchQueryChange: (searchQuery) => {
      setSearchValues((prev) => ({ ...prev, searchQuery }));
    },
    onToggleSearchSubfolders: () => {
      setSearchValues(({ isSearchSubfoldersEnabled, searchQuery }) => ({
        isSearchSubfoldersEnabled: !isSearchSubfoldersEnabled,
        searchQuery,
      }));
    },
  };
};
