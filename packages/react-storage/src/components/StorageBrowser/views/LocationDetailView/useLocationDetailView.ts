import React from 'react';

import { isFunction, isUndefined } from '@aws-amplify/ui';
import { useDataState } from '@aws-amplify/ui-react-core';

import { usePaginate } from '../hooks/usePaginate';
import { useStore } from '../../providers/store';
import {
  listLocationItemsHandler,
  ListLocationItemsHandlerOptions,
  LocationData,
  LocationItemData,
  LocationItemType,
} from '../../actions';
import { createEnhancedListHandler } from '../../actions/createEnhancedHandler';
import { useGetActionInput } from '../../providers/configuration';

interface UseLocationDetailView {
  hasNextPage: boolean;
  hasError: boolean;
  isLoading: boolean;
  isPaginateNextDisabled: boolean;
  isPaginatePreviousDisabled: boolean;
  message: string | undefined;
  pageItems: LocationItemData[];
  page: number;
  onAccessItem: (location: LocationData) => void;
  onRefresh: () => void;
  onPaginateNext: () => void;
  onPaginatePrevious: () => void;
  onAddFiles: (files: File[]) => void;
  onSearch: (query: string, includeSubfolders: boolean) => void;
}

export type LocationDetailViewActionType =
  | { type: 'REFRESH_DATA' } // refresh data only
  | { type: 'RESET' } // reset view to initial state
  | { type: 'PAGINATE_NEXT' }
  | { type: 'PAGINATE_PREVIOUS' }
  | { type: 'PAGINATE'; page: number }
  | { type: 'ACCESS_ITEM'; key: string }
  | { type: 'NAVIGATE'; location: LocationData }
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
  onNavigate?: (destination: LocationData) => void;
}

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  delimiter: '/',
  pageSize: DEFAULT_PAGE_SIZE,
};

const listLocationItemsAction = createEnhancedListHandler<
  ListLocationItemsHandlerOptions,
  LocationItemData,
  LocationItemType
>(listLocationItemsHandler);
export function useLocationDetailView(
  options?: UseLocationDetailViewOptions
): UseLocationDetailView {
  const { initialValues, onActionSelect, onNavigate } = options ?? {};

  const listOptionsRef = React.useRef({
    ...DEFAULT_LIST_OPTIONS,
    ...initialValues,
  });

  const listOptions = listOptionsRef.current;

  const [{ history }, dispatchStoreAction] = useStore();
  const { current } = history;
  const { prefix } = current ?? {};
  const hasInvalidPrefix = isUndefined(prefix);

  const config = useGetActionInput()();

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
    handleList({ config, prefix, options: { ...listOptions, nextToken } });
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
    handleList({ config, prefix, options: { ...listOptions, refresh: true } });
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
  };

  const onSearch = (query: string, includeSubfolders: boolean) => {
    if (hasInvalidPrefix) return;
    const searchOptions = {
      ...listOptions,
      delimiter: includeSubfolders ? undefined : listOptions.delimiter,
      search: { query, filterKey: 'key' as const },
    };
    handleList({ config, prefix, options: searchOptions });
  };

  React.useEffect(() => {
    if (hasInvalidPrefix) return;
    handleList({ config, prefix, options: { ...listOptions, refresh: true } });
    handleReset();
  }, [handleList, handleReset, config, listOptions, hasInvalidPrefix, prefix]);

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
    hasError,
    message,
    isLoading,
    onPaginatePrevious: handlePaginatePrevious,
    onPaginateNext: () => {
      handlePaginateNext({ resultCount, hasNextToken });
    },
    onRefresh,
    onAccessItem: (destination: LocationData) => {
      onNavigate?.(destination);
      dispatchStoreAction({ type: 'NAVIGATE', destination });
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
    onSearch,
  };
}
