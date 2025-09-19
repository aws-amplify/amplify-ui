import React, { useCallback } from 'react';

import { isFunction, isUndefined } from '@aws-amplify/ui';

import { usePaginate } from '../hooks/usePaginate';

import type {
  DownloadHandlerData,
  FileData,
  FileDataItem,
  FolderData,
  LocationData,
} from '../../actions';
import { useActionConfigs } from '../../actions';
import { useFileItems } from '../../fileItems';
import { useLocationItems } from '../../locationItems';
import { useStore } from '../../store';
import { useAction, useList } from '../../useAction';

import { useSearch } from '../hooks/useSearch';

import type { Task } from '../../tasks';

import type {
  LocationDetailViewState,
  UseLocationDetailViewOptions,
} from './types';
import { useFilePreview } from '../hooks/useFilePreview';

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

  const [{ location, actionType }, storeDispatch] = useStore();
  const [locationItems, locationItemsDispatch] = useLocationItems();
  const fileItemsDispatch = useFileItems()[1];
  const [activeFile, setActiveFile] = React.useState<FileData | undefined>();

  const { current, key } = location;
  const { permissions, prefix } = current ?? {};
  const { fileDataItems } = locationItems;
  const hasInvalidPrefix = isUndefined(prefix);

  const [{ task }, handleDownload] = useAction('download');

  const [{ value, isLoading, hasError, message }, handleList] =
    useList('locationItems');

  // set up pagination
  const { items, nextToken, hasExhaustedSearch = false } = value;

  const onPaginate = () => {
    if (hasInvalidPrefix || !nextToken) return;
    locationItemsDispatch({ type: 'RESET_LOCATION_ITEMS' });
    handleList({
      prefix: key,
      options: { ...listOptions, nextToken },
    });
  };

  const {
    currentPage,
    handlePaginate,
    handleReset,
    highestPageVisited,
    pageItems,
  } = usePaginate({
    items,
    onPaginate,
    pageSize: listOptions.pageSize,
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

    locationItemsDispatch({ type: 'RESET_LOCATION_ITEMS' });
  };

  const { activeFileHasPrev, activeFileHasNext } = React.useMemo(() => {
    if (!activeFile)
      return {
        activeFileHasNext: false,
        activeFileHasPrev: false,
      };
    const idx = pageItems.findIndex((item) => item.id === activeFile?.id);
    let pIdx = idx;
    do {
      --pIdx;
    } while (pIdx >= 0 && pageItems[pIdx].type !== 'FILE');
    let nIdx = idx;
    do {
      ++nIdx;
    } while (nIdx <= pageItems.length - 1 && pageItems[nIdx].type !== 'FILE');

    return {
      activeFileHasPrev: pIdx >= 0,
      activeFileHasNext: nIdx <= pageItems.length - 1,
    };
  }, [activeFile, pageItems]);

  const getSuitableNextItem = useCallback(
    <T extends 'FILE' | 'FOLDER'>(
      direction: 'prev' | 'next',
      type: T
    ): (T extends 'FILE' ? FileData : FolderData) | undefined => {
      // first find the position
      let newIdx = pageItems.findIndex((item) => item.id === activeFile?.id);
      if (direction === 'prev') {
        do {
          --newIdx;
        } while (newIdx >= 0 && pageItems[newIdx].type !== type);
        if (pageItems[newIdx].type === type) {
          return pageItems[newIdx] as T extends 'FILE' ? FileData : FolderData;
        }
      } else {
        do {
          ++newIdx;
        } while (
          newIdx <= pageItems.length - 1 &&
          pageItems[newIdx].type !== type
        );
        if (pageItems[newIdx].type === type) {
          return pageItems[newIdx] as T extends 'FILE' ? FileData : FolderData;
        }
      }
    },
    [activeFile, pageItems]
  );

  const onSelectActiveFile = (arg?: FileData | 'next' | 'prev') => {
    if (arg === 'prev') {
      setActiveFile(getSuitableNextItem('prev', 'FILE'));
    } else if (arg === 'next') {
      setActiveFile(getSuitableNextItem('next', 'FILE'));
    } else {
      setActiveFile(arg);
    }
  };

  const {
    searchQuery,
    isSearchingSubfolders: isSearchSubfoldersEnabled,
    onSearchQueryChange,
    onSearchSubmit,
    onToggleSearchSubfolders,
    resetSearch,
  } = useSearch({ onSearch });

  const { handleRetry, optout, ...filePreviewState } = useFilePreview({
    activeFile,
  });

  const onRefresh = () => {
    if (hasInvalidPrefix) return;

    handleReset();
    resetSearch();
    handleList({
      prefix: key,
      options: { ...listOptions, refresh: true },
    });
    setActiveFile(undefined);

    locationItemsDispatch({ type: 'RESET_LOCATION_ITEMS' });
  };

  React.useEffect(() => {
    if (hasInvalidPrefix) return;
    handleList({
      prefix: key,
      options: { ...listOptions, refresh: true },
    });
    handleReset();
    setActiveFile(undefined);
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
    activeFile,
    activeFileHasNext,
    activeFileHasPrev,
    onSelectActiveFile,
    page: currentPage,
    pageItems,
    location,
    fileDataItems,
    hasError,
    hasDownloadError: task?.status === 'FAILED',
    hasNextPage: !!nextToken,
    highestPageVisited,
    message,
    downloadErrorMessage: getDownloadErrorMessageFromFailedDownloadTask(task),
    isLoading,
    isSearchSubfoldersEnabled,
    onPaginate: (p: number) => {
      handlePaginate(p);
      setActiveFile(undefined);
    },
    searchQuery,
    filePreviewState,
    filePreviewEnabled: !optout,
    hasExhaustedSearch,
    onRefresh,
    onActionExit: () => {
      storeDispatch({ type: 'RESET_ACTION_TYPE' });
    },
    onActionSelect: (nextActionType) => {
      options?.onActionSelect?.(nextActionType);
      storeDispatch({
        type: 'CHANGE_ACTION_TYPE',
        actionType: nextActionType,
      });
    },
    onNavigate: (location: LocationData, path?: string) => {
      onNavigate?.(location, path);
      resetSearch();
      storeDispatch({ type: 'CHANGE_LOCATION', location, path });
      locationItemsDispatch({ type: 'RESET_LOCATION_ITEMS' });
      setActiveFile(undefined);
    },
    onDropFiles: (files: File[]) => {
      fileItemsDispatch({ type: 'ADD_FILES', files });

      const actionType = 'upload';
      storeDispatch({ type: 'CHANGE_ACTION_TYPE', actionType });
      options?.onActionSelect?.(actionType);
    },
    onDownload: (data: FileDataItem) => {
      handleDownload({ data });
    },
    onNavigateHome: () => {
      onExit?.();
      storeDispatch({ type: 'RESET_LOCATION' });

      handleList({
        // @todo: prefix should not be required to refresh
        prefix: prefix ?? '',
        options: { reset: true },
      });
      storeDispatch({ type: 'RESET_ACTION_TYPE' });
      locationItemsDispatch({ type: 'RESET_LOCATION_ITEMS' });
    },
    onSelect: (isSelected: boolean, fileItem: FileData) => {
      locationItemsDispatch(
        isSelected
          ? { type: 'REMOVE_LOCATION_ITEM', id: fileItem.id }
          : { type: 'SET_LOCATION_ITEMS', items: [fileItem] }
      );
    },
    onToggleSelectAll: () => {
      const fileItems = pageItems.filter(
        (item): item is FileData => item.type === 'FILE'
      );
      locationItemsDispatch(
        fileItems.length === fileDataItems?.length
          ? { type: 'RESET_LOCATION_ITEMS' }
          : { type: 'SET_LOCATION_ITEMS', items: fileItems }
      );
    },
    onSearch: () => {
      setActiveFile(undefined);
      onSearchSubmit();
    },
    onSearchClear: () => {
      resetSearch();
      if (hasInvalidPrefix) return;
      handleList({ prefix: key, options: { ...listOptions, refresh: true } });
      handleReset();
    },
    onSearchQueryChange,
    onRetryFilePreview: handleRetry,
    onToggleSearchSubfolders,
  };
};
