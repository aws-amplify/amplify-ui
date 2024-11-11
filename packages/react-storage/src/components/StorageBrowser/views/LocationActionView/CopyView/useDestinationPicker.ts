import { useEffect } from 'react';
import { usePaginate } from '../../hooks/usePaginate';
import {
  listLocationItemsHandler,
  ListLocationItemsHandlerOutput,
  LocationItemData,
} from '../../../actions';
import { useGetActionInput } from '../../../providers/configuration';
import { getDestinationListFullPrefix } from './getDestinationListFullPrefix';

import { useDataState } from '@aws-amplify/ui-react-core';
import { useStore } from '../../../providers/store';
import { createEnhancedListHandler } from '../../../actions/createEnhancedListHandler';

const DEFAULT_PAGE_SIZE = 1000;
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
  onSearch: (query: string) => void;
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

  const { currentPage, onPaginate, highestPageVisited, pageItems } =
    usePaginate({
      items,
      paginateCallback,
      pageSize: 10,
      hasNextToken,
    });

  useEffect(() => {
    handleList({
      config: getInput(),
      prefix,
      options: { ...DEFAULT_REFRESH_OPTIONS, nextToken },
    });
  }, [getInput, handleList, nextToken, prefix]);

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
    onPaginate,
    onSearch: (query: string) => {
      handleList({
        config: getInput(),
        prefix,
        options: {
          ...DEFAULT_LIST_OPTIONS,
          search: { query, filterKey: 'key' },
        },
      });
    },
  };
};
