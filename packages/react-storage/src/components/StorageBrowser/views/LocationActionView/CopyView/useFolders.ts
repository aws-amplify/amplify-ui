import React from 'react';

import { useDataState, useHasValueUpdated } from '@aws-amplify/ui-react-core';

import { usePaginate } from '../../hooks/usePaginate';
import { listLocationItemsHandler, FolderData } from '../../../actions';
import { useGetActionInput } from '../../../providers/configuration';

import { createEnhancedListHandler } from '../../../actions/createEnhancedListHandler';
import { useSearch } from '../../hooks/useSearch';
import { getDestinationListFullPrefix } from './utils';
import {
  ListLocationItemsHandlerInput,
  ListHandlerOutput,
} from '../../../actions';

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
  exclude: 'FILE' as const,
};

const DEFAULT_REFRESH_OPTIONS = { ...DEFAULT_LIST_OPTIONS, refresh: true };

export type ListFoldersAction = (
  input: ListLocationItemsHandlerInput
) => Promise<ListHandlerOutput<FolderData>>;

const listLocationItemsAction = createEnhancedListHandler(
  listLocationItemsHandler as ListFoldersAction
);

export const useFolders = ({
  destinationList,
  onDestinationChange,
}: {
  destinationList?: string[];
  onDestinationChange?: (destinationList: string[]) => void;
}): {
  currentPage: number;
  currentQuery: string;
  folders: FolderData[];
  hasError: boolean;
  hasInitialized: boolean;
  hasMorePages: boolean;
  highestPageVisited: number;
  isLoading: boolean;
  message: string | undefined;
  onSelect: (name: string) => void;
  onPaginate: (page: number) => void;
  onQuery: (value: string) => void;
  onSearch: () => void;
  onSearchClear: () => void;
} => {
  const prefix = !destinationList
    ? ''
    : getDestinationListFullPrefix(destinationList);

  const [{ data, hasError, isLoading, message }, handleList] = useDataState(
    listLocationItemsAction,
    { items: [], nextToken: undefined }
  );

  const getInput = useGetActionInput();

  const { items, nextToken } = data;

  const hasInitializedRef = React.useRef(false);
  const hasItemsChanged = useHasValueUpdated(items, true);
  if (hasItemsChanged) {
    hasInitializedRef.current = true;
  }

  const hasMorePages = !!nextToken;

  const paginateCallback = () => {
    handleList({
      config: getInput(),
      prefix,
      options: { ...DEFAULT_LIST_OPTIONS, nextToken },
    });
  };

  const {
    currentPage,
    onPaginate,
    highestPageVisited,
    pageItems: folders,
    handleReset,
  } = usePaginate({
    items,
    paginateCallback,
    pageSize: DEFAULT_PAGE_SIZE,
    hasNextToken: hasMorePages,
  });

  const onSearch = (query: string) => {
    handleReset();
    handleList({
      config: getInput(),
      prefix,
      options: {
        ...DEFAULT_LIST_OPTIONS,
        search: { query, filterKey: 'key' },
      },
    });
  };

  const onSelect = (name: string) => {
    const newPath = !destinationList
      ? undefined
      : [...destinationList, name.replace('/', '')];

    if (!newPath) return;

    onDestinationChange?.(newPath);
  };

  const {
    onSearchSubmit,
    searchQuery,
    resetSearch,
    onSearchQueryChange: onQuery,
  } = useSearch({ onSearch });

  React.useEffect(() => {
    handleList({
      config: getInput(),
      prefix,
      options: { ...DEFAULT_REFRESH_OPTIONS },
    });
  }, [getInput, handleList, prefix]);

  return {
    currentPage,
    currentQuery: searchQuery,
    folders,
    hasError,
    hasInitialized: hasInitializedRef.current,
    hasMorePages,
    highestPageVisited,
    isLoading,
    message,
    onPaginate,
    onQuery,
    onSearch: onSearchSubmit,
    onSearchClear: () => {
      handleReset();
      resetSearch();
      handleList({
        config: getInput(),
        prefix,
        options: { ...DEFAULT_REFRESH_OPTIONS },
      });
    },
    onSelect,
  };
};
