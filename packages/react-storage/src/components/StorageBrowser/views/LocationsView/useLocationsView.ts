import React from 'react';

import { useDataState } from '@aws-amplify/ui-react-core';

import { usePaginate } from '../hooks/usePaginate';
import {
  listLocationsHandler,
  ListLocationsHandlerOptions,
  LocationData,
} from '../../actions';
import { useStore } from '../../providers/store';
import { createEnhancedListHandler } from '../../actions/createEnhancedListHandler';
import { ExclusionsType } from '../../actions/handlers';
import { useGetActionInput } from '../../providers/configuration';

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
  onSearch: (query: string) => void;
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

const listLocationsAction = createEnhancedListHandler<
  ListLocationsHandlerOptions,
  LocationData,
  ExclusionsType
>(listLocationsHandler);

export function useLocationsView(
  options?: UseLocationsViewOptions
): UseLocationsView {
  const [state, handleList] = useDataState(listLocationsAction, {
    items: [],
    nextToken: undefined,
  });

  const [{ location }, dispatchStoreAction] = useStore();
  const { current } = location;
  const { prefix = '' } = current ?? {};
  const { data, message, hasError, isLoading } = state;
  const { items, nextToken } = data;
  const resultCount = items.length;
  const hasNextToken = !!nextToken;

  const config = useGetActionInput()();

  const onNavigate = options?.onNavigate;
  const initialValues = options?.initialValues ?? {};

  const [listOptions] = React.useState({
    ...DEFAULT_LIST_OPTIONS,
    ...initialValues,
  });

  // initial load
  React.useEffect(() => {
    handleList({
      config,
      prefix,
      options: { ...listOptions, refresh: true },
    });
  }, [config, prefix, handleList, listOptions]);

  // set up pagination
  const onPaginateNext = () =>
    handleList({
      config,
      prefix,
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
    return items.slice(start, end);
  }, [range, items]);

  return {
    isLoading,
    hasError,
    message,
    isPaginateNextDisabled: !hasNextToken || isLoading || hasError,
    isPaginatePreviousDisabled: currentPage <= 1 || isLoading || hasError,
    page: currentPage,
    hasNextPage: hasNextToken,
    pageItems,
    onNavigate: (location: LocationData) => {
      onNavigate?.(location);
      dispatchStoreAction({ type: 'NAVIGATE', location });
    },
    onRefresh: () => {
      handleReset();
      handleList({
        config,
        prefix,
        options: { ...listOptions, refresh: true },
      });
    },
    onPaginateNext: () => {
      handlePaginateNext({ resultCount, hasNextToken });
    },
    onPaginatePrevious: handlePaginatePrevious,
    onSearch: (query) => {
      const searchOptions = {
        ...listOptions,
        search: { query, filterKey: 'prefix' as const },
      };
      handleList({ config, prefix, options: searchOptions });
    },
  };
}
