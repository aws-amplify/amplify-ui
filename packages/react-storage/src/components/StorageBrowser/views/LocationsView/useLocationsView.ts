import React from 'react';

import { useLocationsData } from '../../do-not-import-from-here/actions';
import { usePaginate } from '../hooks/usePaginate';
import { LocationData } from '../../actions';
import { useStore } from '../../providers/store';

interface UseLocationsView {
  hasNextPage: boolean;
  hasError: boolean;
  isLoading: boolean;
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
  | { type: 'SELECT_LOCATION'; location: LocationData }
  | { type: 'SEARCH'; query: string };

export interface UseLocationsViewOptions {
  initialValues?: InitialValues;
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
  const [, dispatchStoreAction] = useStore();
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
    onNavigate: (destination: LocationData) => {
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
