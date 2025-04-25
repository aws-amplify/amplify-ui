import React from 'react';

import type { LocationState } from '../../../store';
import { useList } from '../../../useAction';

import { usePaginate } from '../../hooks/usePaginate';
import { useSearch } from '../../hooks/useSearch';

import type { FoldersState } from './types';

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
  exclude: 'FILE' as const,
};

const DEFAULT_REFRESH_OPTIONS = { ...DEFAULT_LIST_OPTIONS, refresh: true };

interface UseFoldersInput {
  destination: LocationState;
  setDestination: (destination: LocationState) => void;
}

export const useFolders = ({
  destination,
  setDestination,
}: UseFoldersInput): FoldersState => {
  const { current, key } = destination;

  const [{ value, hasError, isLoading, message }, handleList] =
    useList('folderItems');

  const { items, nextToken, hasExhaustedSearch = false } = value;

  const onInitialize = React.useCallback(() => {
    handleList({
      prefix: key,
      options: { ...DEFAULT_REFRESH_OPTIONS },
    });
  }, [handleList, key]);

  const hasNextPage = !!nextToken;

  const onPaginate = () => {
    if (!hasNextPage) return;

    handleList({
      prefix: key,
      options: { ...DEFAULT_LIST_OPTIONS, nextToken },
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
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const onSearch = (query: string) => {
    handleReset();
    handleList({
      prefix: key,
      options: { ...DEFAULT_LIST_OPTIONS, search: { query, filterBy: 'key' } },
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
