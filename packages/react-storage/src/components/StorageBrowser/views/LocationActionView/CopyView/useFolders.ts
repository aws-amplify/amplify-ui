import React from 'react';

import { usePaginationConfig } from '../../../configuration';
import type { LocationState } from '../../../store';
import { useList } from '../../../useAction';

import { usePaginate } from '../../hooks/usePaginate';
import { useSearch } from '../../hooks/useSearch';

import type { FoldersState } from './types';

// Default options for tests
export const DEFAULT_LIST_OPTIONS = {
  pageSize: 100, // fallback for tests
  delimiter: '/',
  exclude: 'FILE' as const,
};

interface UseFoldersInput {
  destination: LocationState;
  setDestination: (destination: LocationState) => void;
  pageSize?: number;
}

export const useFolders = ({
  destination,
  setDestination,
  pageSize: propPageSize,
}: UseFoldersInput): FoldersState => {
  const { pageSize: configPageSize } = usePaginationConfig();
  const { current, key } = destination;

  const pageSize = propPageSize ?? configPageSize;

  const listOptions = {
    pageSize,
    delimiter: '/',
    exclude: 'FILE' as const,
  };

  const DEFAULT_REFRESH_OPTIONS = React.useMemo(
    () => ({
      pageSize,
      delimiter: '/',
      exclude: 'FILE' as const,
      refresh: true,
    }),
    [pageSize]
  );

  const [{ value, hasError, isLoading, message }, handleList] =
    useList('folderItems');

  const { items, nextToken, hasExhaustedSearch = false } = value;

  const onInitialize = React.useCallback(() => {
    handleList({
      prefix: key,
      options: { ...DEFAULT_REFRESH_OPTIONS },
    });
  }, [handleList, key, DEFAULT_REFRESH_OPTIONS]);

  const hasNextPage = !!nextToken;

  const onPaginate = () => {
    if (!hasNextPage) return;

    handleList({
      prefix: key,
      options: { ...listOptions, nextToken },
    });
  };

  const {
    currentPage: page,
    handlePaginate,
    highestPageVisited,
    pageItems,
    handleReset,
  } = usePaginate({
    items,
    onPaginate,
    pageSize,
  });

  const onSearch = (query: string) => {
    handleReset();
    handleList({
      prefix: key,
      options: { ...listOptions, search: { query, filterBy: 'key' } },
    });
  };

  const {
    onSearchSubmit,
    searchQuery: query,
    resetSearch,
    onSearchQueryChange: onQuery,
  } = useSearch({ onSearch });

  const onSelectFolder = (id: string, folderLocationPath: string) => {
    if (!current) {
      return;
    }

    resetSearch();
    setDestination({
      current: { ...current, id },
      path: folderLocationPath,
      key: `${current.prefix ?? ''}${folderLocationPath}`,
    });
  };

  return {
    hasError,
    hasNextPage,
    highestPageVisited,
    isLoading,
    message,
    onInitialize,
    page,
    pageItems,
    query,
    hasExhaustedSearch,
    onPaginate: handlePaginate,
    onQuery,
    onSearch: onSearchSubmit,
    onSearchClear: () => {
      handleReset();
      resetSearch();
      handleList({
        prefix: key,
        options: { ...DEFAULT_REFRESH_OPTIONS },
      });
    },
    onSelectFolder,
  };
};
