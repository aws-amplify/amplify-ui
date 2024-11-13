import { useEffect } from 'react';
import { useDataState } from '@aws-amplify/ui-react-core';

import { usePaginate } from '../../hooks/usePaginate';
import {
  listLocationItemsHandler,
  ListLocationItemsHandlerOutput,
  LocationItemData,
} from '../../../actions';
import { useGetActionInput } from '../../../providers/configuration';

import { useStore } from '../../../providers/store';
import { createEnhancedListHandler } from '../../../actions/createEnhancedListHandler';
import { useSearch } from '../../hooks/useSearch';
import { getDestinationListFullPrefix } from './utils';

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
  exclude: 'FILE' as const,
};

const DEFAULT_REFRESH_OPTIONS = { ...DEFAULT_LIST_OPTIONS, refresh: true };

const listLocationItemsAction = createEnhancedListHandler(
  listLocationItemsHandler
);

export const useDestinationPicker = ({
  destinationList,
}: {
  destinationList: string[];
}): {
  bucket: string | undefined;
  items: ListLocationItemsHandlerOutput['items'];
  hasNextToken: boolean;
  currentPage: number;
  isLoading: boolean;
  highestPageVisited: number;
  hasError: boolean;
  message: string | undefined;
  pageItems: LocationItemData[];
  onPaginate: (page: number) => void;
  searchQuery: string;
  onSearch: () => void;
  onSearchQueryChange: (value: string) => void;
  onSearchClear: () => void;
  resetSearch: () => void;
} => {
  const prefix = getDestinationListFullPrefix(destinationList);

  const [{ data, hasError, isLoading, message }, handleList] = useDataState(
    listLocationItemsAction,
    {
      items: [],
      nextToken: undefined,
    }
  );

  const getInput = useGetActionInput();

  const { items, nextToken } = data;

  const hasNextToken = !!nextToken;

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
    pageItems,
    handleReset,
  } = usePaginate({
    items,
    paginateCallback,
    pageSize: DEFAULT_PAGE_SIZE,
    hasNextToken,
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

  const { onSearchSubmit, onSearchQueryChange, searchQuery, resetSearch } =
    useSearch({ onSearch });

  useEffect(() => {
    handleList({
      config: getInput(),
      prefix,
      options: { ...DEFAULT_REFRESH_OPTIONS },
    });
  }, [getInput, handleList, prefix]);

  const [{ location }] = useStore();

  const { current } = location;
  const { bucket } = current ?? {};
  return {
    items,
    bucket,
    hasNextToken,
    currentPage,
    isLoading,
    highestPageVisited,
    hasError,
    message,
    pageItems,
    searchQuery,
    onPaginate,
    onSearch: onSearchSubmit,
    onSearchQueryChange,
    resetSearch,
    onSearchClear: () => {
      handleReset();
      resetSearch();
      handleList({
        config: getInput(),
        prefix,
        options: { ...DEFAULT_REFRESH_OPTIONS },
      });
    },
  };
};
