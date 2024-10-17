import { LocationAccess } from '../../context/types';
import { ActionState } from '../../context/actions/createActionStateContext';
import { useLocationsData } from '../../context/actions';
import { useControl } from '../../context/control';
import React from 'react';
import { usePaginate } from '../hooks/usePaginate';

interface LocationsViewState {
  // all locations in memory
  items: LocationAccess[];

  // current page
  page: number;

  // more items available to display
  hasMoreData: boolean;

  // windowed subset of locations
  getProcessedItems: () => LocationAccess[];
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

const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_LIST_OPTIONS = {
  exclude: 'WRITE' as const,
  pageSize: DEFAULT_PAGE_SIZE,
};

export function useLocationsView(): ActionState<
  LocationsViewState,
  LocationsViewActionType
> {
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

  const handleAction = (action: LocationsViewActionType) => {
    const { type } = action;
    switch (type) {
      case 'PAGINATE_NEXT':
        handlePaginateNext({ resultCount, hasNextToken });
        break;
      case 'PAGINATE_PREVIOUS':
        handlePaginatePrevious();
        break;
      case 'REFRESH':
        handleReset();
        handleList({
          options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
        });
        break;
      case 'SEARCH':
        // TODO
        break;
      case 'SELECT_LOCATION':
        handleUpdateState({
          type: 'ACCESS_LOCATION',
          location: action.location,
        });
        break;
    }
  };

  const processedItems = React.useMemo(() => {
    const [start, end] = range;
    return result.slice(start, end);
  }, [range, result]);

  const hooksState = {
    isLoading,
    hasError,
    message,
    data: {
      page: currentPage,
      hasMoreData: hasNextToken,
      items: result,
      getProcessedItems() {
        return processedItems;
      },
    },
  };
  return [hooksState, handleAction];
}
