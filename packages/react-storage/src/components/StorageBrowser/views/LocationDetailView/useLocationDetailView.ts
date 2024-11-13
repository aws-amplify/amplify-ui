import React from 'react';

import { isUndefined } from '@aws-amplify/ui';
import { useDataState } from '@aws-amplify/ui-react-core';

import { usePaginate } from '../hooks/usePaginate';
import { useStore } from '../../providers/store';
import {
  FileData,
  LocationData,
  LocationItemData,
  listLocationItemsHandler,
} from '../../actions';
import { isFile } from '../utils';
import { createEnhancedListHandler } from '../../actions/createEnhancedListHandler';
import { useGetActionInput } from '../../providers/configuration';
import { displayText } from '../../displayText/en';
import { LocationState } from '../../providers/store/location';
import { useSearch } from '../hooks/useSearch';
import { useProcessTasks } from '../../tasks';
import { downloadHandler, FileDataItem } from '../../actions/handlers';

interface UseLocationDetailView {
  hasError: boolean;
  hasNextPage: boolean;
  highestPageVisited: number;
  isLoading: boolean;
  location: LocationState;
  areAllFilesSelected: boolean;
  fileDataItems: FileDataItem[] | undefined;
  hasFiles: boolean;
  message: string | undefined;
  shouldShowEmptyMessage: boolean;
  searchPlaceholder: string;
  searchQuery: string;
  includeSubfolders: boolean;
  pageItems: LocationItemData[];
  page: number;
  onDropFiles: (files: File[]) => void;
  onRefresh: () => void;
  onNavigate: (location: LocationData, path?: string) => void;
  onNavigateHome: () => void;
  onPaginate: (page: number) => void;
  onDownload: (fileItem: FileDataItem) => void;
  onSelect: (isSelected: boolean, fileItem: FileData) => void;
  onSelectAll: () => void;
  onSearch: () => void;
  onSearchClear: () => void;
  onSearchQueryChange: (value: string) => void;
  onIncludeSubfoldersChange: (value: boolean) => void;
}

export type LocationDetailViewActionType =
  | { type: 'REFRESH_DATA' } // refresh data only
  | { type: 'RESET' } // reset view to initial state
  | { type: 'PAGINATE'; page: number }
  | { type: 'ACCESS_ITEM'; key: string }
  | { type: 'NAVIGATE'; location: LocationData; path: string }
  | { type: 'ADD_FILES'; files: File[] }
  | { type: 'SEARCH'; query: string; includeSubfolders?: boolean };

interface InitialValues {
  pageSize?: number;
  delimiter?: string;
}

export interface UseLocationDetailViewOptions {
  initialValues?: InitialValues;
  onDispatch?: React.Dispatch<LocationDetailViewActionType>;
  onActionSelect?: (type: string) => void;
  onExit?: () => void;
  onNavigate?: (location: LocationData, path?: string) => void;
}

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  delimiter: '/',
  pageSize: DEFAULT_PAGE_SIZE,
};

const listLocationItemsAction = createEnhancedListHandler(
  listLocationItemsHandler
);

export function useLocationDetailView(
  options?: UseLocationDetailViewOptions
): UseLocationDetailView {
  const getConfig = useGetActionInput();
  const { initialValues, onActionSelect, onExit, onNavigate } = options ?? {};

  const listOptionsRef = React.useRef({
    ...DEFAULT_LIST_OPTIONS,
    ...initialValues,
  });

  const listOptions = listOptionsRef.current;

  const [{ location, locationItems }, dispatchStoreAction] = useStore();
  const { current, key } = location;
  const { prefix } = current ?? {};
  const { fileDataItems } = locationItems;
  const hasInvalidPrefix = isUndefined(prefix);

  const [_, handleDownload] = useProcessTasks(downloadHandler);

  const [{ data, isLoading, hasError, message }, handleList] = useDataState(
    listLocationItemsAction,
    {
      items: [],
      nextToken: undefined,
    }
  );

  // set up pagination
  const { items, nextToken } = data;
  const hasNextToken = !!nextToken;
  const paginateCallback = () => {
    if (hasInvalidPrefix || !nextToken) return;
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    handleList({
      config: getConfig(),
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
      search: { query, filterKey: 'key' as const },
    };

    handleReset();
    handleList({ config: getConfig(), prefix: key, options: searchOptions });
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
  };

  const {
    searchQuery,
    includeSubfolders,
    onIncludeSubfoldersChange,
    onSearchQueryChange,
    onSearchSubmit,
    resetSearch,
  } = useSearch({ onSearch });

  const onRefresh = () => {
    if (hasInvalidPrefix) return;
    handleReset();
    resetSearch();
    handleList({
      config: getConfig(),
      prefix: key,
      options: { ...listOptions, refresh: true },
    });
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
  };

  React.useEffect(() => {
    if (hasInvalidPrefix) return;
    handleList({
      config: getConfig(),
      prefix: key,
      options: { ...listOptions, refresh: true },
    });
    handleReset();
  }, [
    handleList,
    handleReset,
    listOptions,
    hasInvalidPrefix,
    getConfig,
    prefix,
    key,
  ]);

  // Logic for Select All Files functionality
  const fileItems = React.useMemo(
    () => pageItems.filter((item): item is FileData => item.type === 'FILE'),
    [pageItems]
  );
  const areAllFilesSelected = fileDataItems?.length === fileItems.length;
  const shouldShowEmptyMessage =
    pageItems.length === 0 && !isLoading && !hasError;

  return {
    page: currentPage,
    pageItems,
    location,
    areAllFilesSelected,
    fileDataItems,
    hasFiles: fileItems.length > 0,
    hasError,
    hasNextPage: hasNextToken,
    highestPageVisited,
    message,
    shouldShowEmptyMessage,
    isLoading,
    onPaginate,
    searchPlaceholder: displayText.searchDetailPlaceholder,
    searchQuery,
    includeSubfolders,
    onRefresh,
    onNavigate: (location: LocationData, path?: string) => {
      onNavigate?.(location, path);
      resetSearch();
      dispatchStoreAction({ type: 'NAVIGATE', location, path });
      dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    },
    onDropFiles: (files: File[]) => {
      dispatchStoreAction({ type: 'ADD_FILE_ITEMS', files });
      const actionType = files.some((file) => isFile(file))
        ? 'UPLOAD_FILES'
        : 'UPLOAD_FOLDER';
      dispatchStoreAction({
        type: 'SET_ACTION_TYPE',
        actionType,
      });
      onActionSelect?.(actionType);
    },
    onDownload: (data: FileDataItem) => {
      handleDownload({ config: getConfig(), data });
    },
    onNavigateHome: () => {
      onExit?.();
      dispatchStoreAction({ type: 'RESET_LOCATION' });

      handleList({
        config: getConfig(),
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
    onSelectAll: () => {
      dispatchStoreAction(
        areAllFilesSelected
          ? { type: 'RESET_LOCATION_ITEMS' }
          : { type: 'SET_LOCATION_ITEMS', items: fileItems }
      );
    },
    onSearch: onSearchSubmit,
    onSearchClear: () => {
      resetSearch();
      if (hasInvalidPrefix) return;
      handleList({
        config: getConfig(),
        prefix: key,
        options: { ...listOptions, refresh: true },
      });
      handleReset();
    },
    onSearchQueryChange,
    onIncludeSubfoldersChange,
  };
}
