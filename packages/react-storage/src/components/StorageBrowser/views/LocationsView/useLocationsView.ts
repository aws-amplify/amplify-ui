import React from 'react';

import type { ListLocationsExcludeOptions, LocationData } from '../../actions';
import { getFileKey } from '../../actions';
import { usePaginationConfig } from '../../configuration';
import { useStore } from '../../store';
import { useAction, useList } from '../../useAction';

import { usePaginate } from '../hooks/usePaginate';
import { useSearch } from '../hooks/useSearch';
import type { LocationsViewState, UseLocationsViewOptions } from './types';

const DEFAULT_EXCLUDE: ListLocationsExcludeOptions = {
  exactPermissions: ['delete', 'write'],
};

// Default options for tests - will be overridden with actual pageSize in hook
export const DEFAULT_LIST_OPTIONS = {
  exclude: DEFAULT_EXCLUDE,
  pageSize: 100, // fallback for tests
};

export const useLocationsView = (
  options?: UseLocationsViewOptions
): LocationsViewState => {
  const { pageSize: configPageSize } = usePaginationConfig();
  const handleDownload = useAction('download')[1];
  const [state, handleList] = useList('locations');
  const dispatchStoreAction = useStore()[1];

  const { value, message, hasError, isLoading } = state;
  const { items, nextToken, hasExhaustedSearch = false } = value;
  const hasNextToken = !!nextToken;

  const onNavigate = options?.onNavigate;
  const pageSize = options?.pageSize ?? configPageSize;
  const initialValues = options?.initialValues ?? {};

  const listOptions = React.useMemo(
    () => ({
      ...initialValues,
      exclude: DEFAULT_EXCLUDE,
      pageSize,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageSize, initialValues.pageSize]
  );

  // initial load
  React.useEffect(() => {
    handleList({ options: { ...listOptions, refresh: true } });
  }, [handleList, listOptions]);

  // set up pagination
  const onPaginate = () => {
    if (!nextToken) return;
    handleList({ options: { ...listOptions, nextToken } });
  };

  const {
    currentPage,
    handlePaginate,
    handleReset,
    highestPageVisited,
    pageItems,
  } = usePaginate({
    items,
    onPaginate,
    pageSize: listOptions.pageSize,
  });

  const onSearch = (query: string) => {
    handleReset();
    handleList({
      options: {
        ...listOptions,
        search: {
          query,
          filterBy: (location: LocationData) => {
            return location.prefix ? 'prefix' : 'bucket';
          },
        },
      },
    });
  };

  const { searchQuery, onSearchQueryChange, onSearchSubmit, resetSearch } =
    useSearch({ onSearch });

  return {
    isLoading,
    hasError,
    message,
    page: currentPage,
    hasNextPage: hasNextToken,
    highestPageVisited,
    pageItems,
    searchQuery,
    hasExhaustedSearch,
    onDownload: (location: LocationData) => {
      const { prefix: key } = location;
      handleDownload({
        data: {
          fileKey: getFileKey(key),
          key,
          id: crypto.randomUUID(),
        },
        location,
      });
    },
    onNavigate: (location: LocationData) => {
      onNavigate?.(location);
      dispatchStoreAction({ type: 'CHANGE_LOCATION', location });
    },
    onRefresh: () => {
      resetSearch();
      handleReset();
      handleList({ options: { ...listOptions, refresh: true } });
    },
    onPaginate: handlePaginate,
    onSearch: onSearchSubmit,
    onSearchQueryChange,
    onSearchClear: () => {
      resetSearch();
      handleReset();
      handleList({
        options: { ...listOptions, refresh: true },
      });
    },
  };
};
