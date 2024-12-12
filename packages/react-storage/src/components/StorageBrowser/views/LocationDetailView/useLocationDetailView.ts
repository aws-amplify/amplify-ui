import React from 'react';

import { isFunction, isUndefined } from '@aws-amplify/ui';

import { usePaginate } from '../hooks/usePaginate';
import { useStore } from '../../providers/store';
import {
  DownloadHandlerData,
  FileDataItem,
  FileData,
  LocationData,
  useActionConfigs,
} from '../../actions';
import { useAction, useList } from '../../useAction';

import { useSearch } from '../hooks/useSearch';

import { Task } from '../../tasks';

import { LocationDetailViewState, UseLocationDetailViewOptions } from './types';

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  delimiter: '/',
  pageSize: DEFAULT_PAGE_SIZE,
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
  const { initialValues, onExit, onNavigate } = options ?? {};

  const listOptionsRef = React.useRef({
    ...DEFAULT_LIST_OPTIONS,
    ...initialValues,
  });

  const listOptions = listOptionsRef.current;

  const [{ location, locationItems, actionType }, dispatchStoreAction] =
    useStore();
  const { current, key } = location;
  const { permissions, prefix } = current ?? {};
  const { fileDataItems } = locationItems;
  const hasInvalidPrefix = isUndefined(prefix);

  const [{ task }, handleDownload] = useAction('download');

  const [{ data, isLoading, hasError, message }, handleList] =
    useList('locationItems');

  // set up pagination
  const { items, nextToken, search } = data;
  const { hasExhaustedSearch = false } = search ?? {};
  const hasNextToken = !!nextToken;
  const paginateCallback = () => {
    if (hasInvalidPrefix || !nextToken) return;
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    handleList({
      prefix: key,
      options: { ...listOptions, nextToken },
    });
  };

  const {
    currentPage,
    onPaginate,
    handleReset,
    highestPageVisited,
    pageItems,
  } = usePaginate({
    items,
    paginateCallback,
    pageSize: listOptions.pageSize,
    hasNextToken,
  });

  const onSearch = (query: string, includeSubfolders?: boolean) => {
    if (hasInvalidPrefix) return;
    const searchOptions = {
      ...listOptions,
      delimiter: includeSubfolders ? undefined : listOptions.delimiter,
      search: {
        query,
        filterBy: 'key' as const,
        groupBy: includeSubfolders ? listOptions.delimiter : undefined,
      },
    };

    handleReset();
    handleList({ prefix: key, options: searchOptions });

    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
  };

  const {
    searchQuery,
    isSearchingSubfolders: isSearchSubfoldersEnabled,
    onSearchQueryChange,
    onSearchSubmit,
    onToggleSearchSubfolders,
    resetSearch,
  } = useSearch({ onSearch });

  const onRefresh = () => {
    if (hasInvalidPrefix) return;

    handleReset();
    resetSearch();
    handleList({
      prefix: key,
      options: { ...listOptions, refresh: true },
    });

    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
  };

  React.useEffect(() => {
    if (hasInvalidPrefix) return;
    handleList({
      prefix: key,
      options: { ...listOptions, refresh: true },
    });
    handleReset();
  }, [handleList, handleReset, listOptions, hasInvalidPrefix, key]);

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
    actionItems,
    actionType,
    page: currentPage,
    pageItems,
    location,
    fileDataItems,
    hasError,
    hasDownloadError: task?.status === 'FAILED',
    hasNextPage: hasNextToken,
    highestPageVisited,
    message,
    downloadErrorMessage: getDownloadErrorMessageFromFailedDownloadTask(task),
    isLoading,
    isSearchSubfoldersEnabled,
    onPaginate,
    searchQuery,
    hasExhaustedSearch,
    onRefresh,
    onActionExit: () => {
      dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    },
    onActionSelect: (nextActionType) => {
      options?.onActionSelect?.(nextActionType);
      dispatchStoreAction({
        type: 'SET_ACTION_TYPE',
        actionType: nextActionType,
      });
    },
    onNavigate: (location: LocationData, path?: string) => {
      onNavigate?.(location, path);
      resetSearch();
      dispatchStoreAction({ type: 'NAVIGATE', location, path });
      dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    },
    onDropFiles: (files: File[]) => {
      dispatchStoreAction({ type: 'ADD_FILE_ITEMS', files });

      const actionType = 'upload';
      dispatchStoreAction({ type: 'SET_ACTION_TYPE', actionType });
      options?.onActionSelect?.(actionType);
    },
    onDownload: (data: FileDataItem) => {
      handleDownload({ data });
    },
    onNavigateHome: () => {
      onExit?.();
      dispatchStoreAction({ type: 'RESET_LOCATION' });

      handleList({
        // @todo: prefix should not be required to refresh
        prefix: prefix ?? '',
        options: { reset: true },
      });
      dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
      dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    },
    onSelect: (isSelected: boolean, fileItem: FileData) => {
      dispatchStoreAction(
        isSelected
          ? { type: 'REMOVE_LOCATION_ITEM', id: fileItem.id }
          : { type: 'SET_LOCATION_ITEMS', items: [fileItem] }
      );
    },
    onToggleSelectAll: () => {
      const fileItems = pageItems.filter(
        (item): item is FileData => item.type === 'FILE'
      );
      dispatchStoreAction(
        fileItems.length === fileDataItems?.length
          ? { type: 'RESET_LOCATION_ITEMS' }
          : { type: 'SET_LOCATION_ITEMS', items: fileItems }
      );
    },
    onSearch: onSearchSubmit,
    onSearchClear: () => {
      resetSearch();
      if (hasInvalidPrefix) return;
      handleList({
        prefix: key,
        options: { ...listOptions, refresh: true },
      });
      handleReset();
    },
    onSearchQueryChange,
    onToggleSearchSubfolders,
  };
};
