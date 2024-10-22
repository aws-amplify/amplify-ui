import React from 'react';

import { LocationAccess } from '../../context/types';
import { useLocationsData } from '../../context/actions';
import { useControl } from '../../context/control';
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

interface InitialValues {
  pageSize?: number;
}

export type LocationsViewActionType =
  | { type: 'REFRESH' }
  | { type: 'RESET' }
  | { type: 'PAGINATE_NEXT' }
  | { type: 'PAGINATE_PREVIOUS' }
  | { type: 'PAGINATE'; page: number }
  | { type: 'SELECT_LOCATION'; location: LocationAccess }
  | { type: 'SEARCH'; query: string };

export interface UseLocationsViewOptions {
  /**
   * initial state values
   */
  initialValues?: InitialValues;
  // type Dispatch<A> = (value: A) => void;
  onDispatch?: React.Dispatch<LocationsViewActionType>;
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
  const [, handleUpdateState] = useControl('NAVIGATE');
  const { data, message, hasError, isLoading } = state;
  const { result, nextToken } = data;
  const resultCount = result.length;
  const hasNextToken = !!nextToken;
  const initialValues = options?.initialValues;

  const listOptions = React.useMemo(() => {
    return {
      ...DEFAULT_LIST_OPTIONS,
      ...initialValues,
    };
  }, [initialValues]);

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
        options: { ...listOptions, refresh: true },
      });
    },
    onPaginateNext: () => {
      handlePaginateNext({ resultCount, hasNextToken });
    },
    onPaginatePrevious: handlePaginatePrevious,
  };
}
