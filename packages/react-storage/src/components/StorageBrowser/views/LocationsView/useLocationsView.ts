import { LocationAccess } from '../../context/types';
import { ActionState } from '../../context/actions/createActionStateContext';
import { useLocationsData } from '../../context/actions';
import { useControl } from '../../context/control';
import React from 'react';
import { usePaginate } from '../hooks/usePaginate';

interface UseLocationsView {
  // items to display
  items: LocationAccess[];

  // current page
  page: number;

  // more items available to display
  hasMoreData: boolean;

  // escape hatch to access internal hook state
  getState: () => LocationsViewState;
}

interface LocationsViewState {
  // all items in memory
  allItems: LocationAccess[];
  // current page size
  pageSize: number;
}

export type LocationsViewActionType =
  // refresh data
  | { type: 'refresh' }
  // reset view to initial state
  | { type: 'reset' }
  // paginate
  | { type: 'paginate-next' }
  | { type: 'paginate-previous' }
  // set location to be provided to LocationDetailView
  | { type: 'select-location'; location: LocationAccess }
  // query locations
  | { type: 'search'; query: string; includeSubfolders?: boolean };

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  exclude: 'WRITE' as const,
  pageSize: DEFAULT_PAGE_SIZE,
};

export function useLocationsView(): ActionState<
  UseLocationsView,
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
      case 'paginate-next':
        handlePaginateNext({ resultCount, hasNextToken });
        break;
      case 'paginate-previous':
        handlePaginatePrevious();
        break;
      case 'refresh':
        handleReset();
        handleList({
          options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
        });
        break;
      case 'search':
        // TODO
        break;
      case 'select-location':
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
      items: processedItems,
      getState() {
        return {
          allItems: result,
          pageSize,
        };
      },
    },
  };
  return [hooksState, handleAction];
}
