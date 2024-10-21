import { LocationAccess } from '../../context/types';
import { useLocationsData } from '../../context/actions';
import { useControl } from '../../context/control';
import React from 'react';
import { usePaginate } from '../hooks/usePaginate';

interface UseLocationsView {
  hasNextPage: boolean;
  hasError: boolean;
  isLoading: boolean;
  message: string | undefined;
  pageItems: LocationAccess[];
  page: number;
  onNavigate: (location: LocationAccess) => void;
  onRefresh: () => void;
  onPaginateNext: () => void;
  onPaginatePrevious: () => void;
}

export type LocationsViewActionType =
  // refresh data
  | { type: 'REFRESH' }
  // reset view to initial state
  | { type: 'RESET' }
  // paginate
  | { type: 'PAGINATE_NEXT' }
  | { type: 'PAGINATE_PREVIOUS' }
  // set location to be provided to LocationDetailView
  | { type: 'SELECT_LOCATION'; location: LocationAccess }
  // query locations
  | { type: 'SEARCH'; query: string; includeSubfolders?: boolean };

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  exclude: 'WRITE' as const,
  pageSize: DEFAULT_PAGE_SIZE,
};

export function useLocationsView(): UseLocationsView {
  const [state, handleList] = useLocationsData();
  const [, handleUpdateState] = useControl('NAVIGATE');

  const { data, message, hasError, isLoading } = state;
  const { result, nextToken } = data;
  const resultCount = result.length;
  const hasNextToken = !!nextToken;
  const pageSize = DEFAULT_PAGE_SIZE;

  // initial load
  React.useEffect(() => {
    handleList({
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
  }, [handleList]);

  // set up pagination
  const onPaginateNext = () =>
    handleList({
      options: { ...DEFAULT_LIST_OPTIONS, nextToken },
    });

  const {
    currentPage,
    handlePaginateNext,
    handlePaginatePrevious,
    handleReset,
    range,
  } = usePaginate({ onPaginateNext, pageSize });

  const processedItems = React.useMemo(() => {
    const [start, end] = range;
    return result.slice(start, end);
  }, [range, result]);

  return {
    isLoading,
    hasError,
    message,
    page: currentPage,
    hasNextPage: hasNextToken,
    pageItems: processedItems,
    onNavigate: (location: LocationAccess) => {
      handleUpdateState({
        type: 'ACCESS_LOCATION',
        location: location,
      });
    },
    onRefresh: () => {
      handleReset();
      handleList({
        options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
      });
    },
    onPaginateNext: () => {
      handlePaginateNext({ resultCount, hasNextToken });
    },
    onPaginatePrevious: handlePaginatePrevious,
  };
}
