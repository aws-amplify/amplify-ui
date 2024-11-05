import React from 'react';

import { isFunction, isUndefined } from '@aws-amplify/ui';
import { useDataState } from '@aws-amplify/ui-react-core';

import { usePaginate } from '../hooks/usePaginate';
import { useStore } from '../../providers/store';
import {
  listLocationItemsHandler,
  LocationData,
  LocationItemData,
} from '../../actions';
import { LocationState } from '../../providers/store/location';
import { createEnhancedListHandler } from '../../actions/createEnhancedListHandler';
import { useGetActionInput } from '../../providers/configuration';
import { displayText } from '../../displayText/en';

interface UseLocationDetailView {
  hasNextPage: boolean;
  hasError: boolean;
  isLoading: boolean;
  isPaginateNextDisabled: boolean;
  isPaginatePreviousDisabled: boolean;
  showIncludeSubfolders: boolean;
  location: LocationState;
  message: string | undefined;
  searchPlaceholder: string;
  pageItems: LocationItemData[];
  page: number;
  onNavigate: (location: LocationData, path?: string) => void;
  onRefresh: () => void;
  onPaginateNext: () => void;
  onPaginatePrevious: () => void;
  onAddFiles: (files: File[]) => void;
  onNavigateHome: () => void;
  onSearch: (query: string, includeSubfolders?: boolean) => void;
}

export type LocationDetailViewActionType =
  | { type: 'REFRESH_DATA' } // refresh data only
  | { type: 'RESET' } // reset view to initial state
  | { type: 'PAGINATE_NEXT' }
  | { type: 'PAGINATE_PREVIOUS' }
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
  const { initialValues, onActionSelect, onExit, onNavigate } = options ?? {};

  const listOptionsRef = React.useRef({
    ...DEFAULT_LIST_OPTIONS,
    ...initialValues,
  });

  const listOptions = listOptionsRef.current;

  const [{ location }, dispatchStoreAction] = useStore();
  const { current, key } = location;
  const { prefix } = current ?? {};
  const hasInvalidPrefix = isUndefined(prefix);

  const getConfig = useGetActionInput();

  const [{ data, isLoading, hasError, message }, handleList] = useDataState(
    listLocationItemsAction,
    { items: [], nextToken: undefined }
  );

  // set up pagination
  const { items, nextToken } = data;
  const resultCount = items.length;
  const hasNextToken = !!nextToken;
  const onPaginateNext = () => {
    if (hasInvalidPrefix || !nextToken) return;
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    handleList({
      config: getConfig(),
      prefix: key,
      options: { ...listOptions, nextToken },
    });
  };

  const onPaginatePrevious = () => {
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
  };

  const {
    currentPage,
    handlePaginateNext,
    handlePaginatePrevious,
    handleReset,
    range,
  } = usePaginate({
    onPaginateNext,
    onPaginatePrevious,
    pageSize: listOptions.pageSize,
  });

  const onRefresh = () => {
    if (hasInvalidPrefix) return;
    handleReset();
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

  const pageItems = React.useMemo(() => {
    const [start, end] = range;
    return items.slice(start, end);
  }, [range, items]);

  return {
    page: currentPage,
    pageItems,
    hasNextPage: hasNextToken,
    isPaginateNextDisabled: !hasNextToken || isLoading || hasError,
    isPaginatePreviousDisabled: currentPage <= 1 || isLoading || hasError,
    location,
    hasError,
    message,
    isLoading,
    showIncludeSubfolders: true,
    searchPlaceholder: displayText.searchDetailPlaceholder,
    onPaginatePrevious: handlePaginatePrevious,
    onPaginateNext: () => {
      handlePaginateNext({ resultCount, hasNextToken });
    },
    onRefresh,
    onNavigate: (location: LocationData, path?: string) => {
      onNavigate?.(location, path);
      dispatchStoreAction({ type: 'NAVIGATE', location, path });
      dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    },
    onAddFiles: (files: File[]) => {
      dispatchStoreAction({ type: 'ADD_FILE_ITEMS', files });
      dispatchStoreAction({
        type: 'SET_ACTION_TYPE',
        actionType: 'UPLOAD_FILES',
      });

      if (isFunction(onActionSelect)) onActionSelect('UPLOAD_FILES');
    },
    onNavigateHome: () => {
      onExit?.();
      dispatchStoreAction({ type: 'RESET_LOCATION' });

      handleList({
        config: getConfig(),
        // @todo: prefix should not be required to refresh
        prefix: current?.prefix ?? '',
        options: { reset: true },
      });
      dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
      dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    },
    onSearch: (query, includeSubfolders) => {
      if (hasInvalidPrefix) return;
      const searchOptions = {
        ...listOptions,
        delimiter: includeSubfolders ? undefined : listOptions.delimiter,
        search: { query, filterKey: 'key' as const },
      };
      handleReset();
      handleList({ config: getConfig(), prefix, options: searchOptions });
      dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    },
  };
}
