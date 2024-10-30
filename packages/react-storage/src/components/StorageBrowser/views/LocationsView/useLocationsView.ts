import React from 'react';

import { useLocationsData } from '../../do-not-import-from-here/actions';
import { usePaginate } from '../hooks/usePaginate';
import { LocationData } from '../../actions';
import { useStore } from '../../providers/store';

interface UseLocationsView {
  hasNextPage: boolean;
  hasError: boolean;
  isLoading: boolean;
  isPaginateNextDisabled: boolean;
  isPaginatePreviousDisabled: boolean;
  message: string | undefined;
  pageItems: LocationData[];
  page: number;
  onNavigate: (location: LocationData) => void;
  onRefresh: () => void;
  onPaginateNext: () => void;
  onPaginatePrevious: () => void;
}

interface InitialValues {
  pageSize?: number;
}

export type LocationsViewActionType =
  | { type: 'REFRESH_DATA' }
  | { type: 'RESET' }
  | { type: 'PAGINATE_NEXT' }
  | { type: 'PAGINATE_PREVIOUS' }
  | { type: 'PAGINATE'; page: number }
  | { type: 'NAVIGATE'; location: LocationData }
  | { type: 'SEARCH'; query: string };

export interface UseLocationsViewOptions {
  initialValues?: InitialValues;
  onDispatch?: React.Dispatch<LocationsViewActionType>;
  onNavigate?: (location: LocationData) => void;
}

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  exclude: 'WRITE' as const,
  pageSize: DEFAULT_PAGE_SIZE,
};

export function useLocationsView(
  options?: UseLocationsViewOptions
): UseLocationsView {
  const [state, handleList] = useLocationsData();
  const [, dispatchStoreAction] = useStore();
  const { data, message, hasError, isLoading } = state;
  const { result, nextToken } = data;
  const resultCount = result.length;
  const hasNextToken = !!nextToken;

  const onNavigate = options?.onNavigate;
  const initialValues = options?.initialValues ?? {};

  const [listOptions] = React.useState({
    ...DEFAULT_LIST_OPTIONS,
    ...initialValues,
  });

  // initial load
  React.useEffect(() => {
    handleList({
      options: { ...listOptions, refresh: true },
    });
  }, [handleList, listOptions]);

  // set up pagination
  const onPaginateNext = () =>
    handleList({
      options: { ...listOptions, nextToken },
    });

  const {
    currentPage,
    handlePaginateNext,
    handlePaginatePrevious,
    handleReset,
    range,
  } = usePaginate({ onPaginateNext, pageSize: listOptions.pageSize });

  const pageItems = React.useMemo(() => {
    const [start, end] = range;
    return result.slice(start, end);
  }, [range, result]);

  return {
    isLoading,
    hasError,
    message,
    isPaginateNextDisabled: !hasNextToken || isLoading || hasError,
    isPaginatePreviousDisabled: currentPage <= 1 || isLoading || hasError,
    page: currentPage,
    hasNextPage: hasNextToken,
    pageItems,
    onNavigate: (destination: LocationData) => {
      onNavigate?.(destination);
      dispatchStoreAction({ type: 'NAVIGATE', destination });
    },
    onRefresh: () => {
      handleReset();
      handleList({
        options: { ...listOptions, refresh: true },
      });
    },
    onPaginateNext: () => {
      handlePaginateNext({ resultCount, hasNextToken });
    },
    onPaginatePrevious: handlePaginatePrevious,
  };
}
