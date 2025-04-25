import type React from 'react';

import { isUndefined } from '@aws-amplify/ui';

import type { LocationItemData } from '../actions';
import type { LocationState } from '../store';
import { useList } from '../useAction';

import { usePaginate } from '../views/hooks/usePaginate';
import { useSearch } from '../views/hooks/useSearch';

interface UseLocationItemsInput {
  pageSize?: number;
  delimiter?: string;
  location?: LocationState;
  query?: string;
  onPaginate?: () => void;
  onRefresh?: () => void;
  onSearch?: () => void;
}

interface LocationItemsState {
  hasError: boolean;
  hasExhaustedSearch: boolean;
  hasNextPage: boolean;
  highestPageVisited: number;
  isLoading: boolean;
  message: string | undefined;
  page: number;
  pageItems: LocationItemData[];
  searchQuery: string;
}

type LocationItemsAction =
  | { type: 'INITIALIZE' }
  | { type: 'PAGINATE'; page: number }
  | { type: 'REFRESH' }
  | { type: 'RESET' }
  | { type: 'SEARCH' }
  | { type: 'SEARCH_CLEAR' }
  | { type: 'SEARCH_QUERY_CHANGE'; value?: string };

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  delimiter: '/',
  pageSize: DEFAULT_PAGE_SIZE,
};

export default function useLocationItemsState(
  input?: UseLocationItemsInput
): [LocationItemsState, React.Dispatch<LocationItemsAction>] {
  const { location, pageSize, delimiter } = input ?? {};

  const { current, key: prefix } = location ?? {};

  const hasInvalidPrefix = isUndefined(prefix);

  const [{ value, isLoading, hasError, message }, handleList] =
    useList('locationItems');

  // set up pagination
  const { items, nextToken, search } = value;
  const { hasExhaustedSearch = false } = search ?? {};

  const onPaginate = () => {
    if (hasInvalidPrefix || !nextToken) return;

    handleList({
      prefix,
      options: { delimiter, nextToken, pageSize },
    });
  };

  const {
    currentPage,
    handlePaginate,
    handleReset,
    highestPageVisited,
    pageItems,
  } = usePaginate({ items, onPaginate, pageSize });

  const onSearch = (query: string, includeSubfolders?: boolean) => {
    if (hasInvalidPrefix) return;

    const searchOptions = {
      pageSize,
      delimiter: includeSubfolders ? undefined : delimiter,
      search: {
        query,
        filterBy: 'key' as const,
        groupBy: includeSubfolders ? delimiter : undefined,
      },
    };

    handleReset();
    handleList({ prefix, options: searchOptions });
  };

  const { searchQuery, onSearchQueryChange, onSearchSubmit, resetSearch } =
    useSearch({ onSearch });

  const dispatch: React.Dispatch<LocationItemsAction> = (action) => {
    const options = { delimiter, pageSize };
    switch (action.type) {
      case 'PAGINATE': {
        handlePaginate(action.page);
        break;
      }
      case 'REFRESH':
      case 'SEARCH_CLEAR': {
        if (hasInvalidPrefix) return;

        handleReset();
        resetSearch();
        handleList({ prefix, options: { ...options, refresh: true } });
        break;
      }
      case 'INITIALIZE': {
        if (hasInvalidPrefix) return;
        handleList({ prefix, options: { ...options, refresh: true } });
        handleReset();
        break;
      }
      case 'RESET': {
        handleList({
          // use base `location.prefix` on reset
          prefix: current?.prefix ?? '',
          options: { reset: true },
        });
        break;
      }
      case 'SEARCH': {
        onSearchSubmit();
        break;
      }
      case 'SEARCH_QUERY_CHANGE': {
        onSearchQueryChange(action.value ?? '');
        break;
      }
    }
  };

  return [
    {
      page: currentPage,
      pageItems,
      hasError,
      hasNextPage: !!nextToken,
      highestPageVisited,
      message,
      isLoading,
      searchQuery,
      hasExhaustedSearch,
    },
    dispatch,
  ];
}
