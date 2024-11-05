import React from 'react';

import { isFunction, isUndefined } from '@aws-amplify/ui';
import { usePaginate } from '../hooks/usePaginate';
import { useStore } from '../../providers/store';
import { useAction } from '../../do-not-import-from-here/actions';
import { LocationData, LocationItemData } from '../../actions';
import { isLastPage } from '../utils';
import { LocationState } from '../../providers/store/location';

interface UseLocationDetailView {
  hasError: boolean;
  isLoading: boolean;
  isPaginateNextDisabled: boolean;
  isPaginatePreviousDisabled: boolean;
  location: LocationState;
  message: string | undefined;
  pageItems: LocationItemData[];
  page: number;
  onNavigate: (location: LocationData, path?: string) => void;
  onRefresh: () => void;
  onPaginateNext: () => void;
  onPaginatePrevious: () => void;
  onAddFiles: (files: File[]) => void;
  onNavigateHome: () => void;
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
  const { pageSize } = listOptions;

  const [{ data, isLoading, hasError, message }, handleList] = useAction(
    'LIST_LOCATION_ITEMS'
  );

  // set up pagination
  const { result, nextToken } = data;
  const resultCount = result.length;
  const hasNextToken = !!nextToken;
  const onPaginateNext = () => {
    if (hasInvalidPrefix || !nextToken) return;
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    handleList({
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
    pageSize,
  });

  const onRefresh = () => {
    if (hasInvalidPrefix) return;
    handleReset();
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
  }, [handleList, handleReset, listOptions, hasInvalidPrefix, prefix, key]);

  const pageItems = React.useMemo(() => {
    const [start, end] = range;
    return result.slice(start, end);
  }, [range, result]);

  const isFinalPage =
    !hasNextToken && isLastPage(currentPage, resultCount, pageSize);
  const hasNoResults = pageItems.length === 0;

  return {
    page: currentPage,
    pageItems,
    isPaginateNextDisabled:
      isFinalPage || isLoading || hasError || hasNoResults,
    isPaginatePreviousDisabled: currentPage <= 1 || isLoading || hasNoResults,
    location,
    hasError,
    message,
    isLoading,
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
        // @todo: prefix should not be required to refresh
        prefix: current?.prefix ?? '',
        options: { reset: true },
      });
      dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
      dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    },
  };
}
