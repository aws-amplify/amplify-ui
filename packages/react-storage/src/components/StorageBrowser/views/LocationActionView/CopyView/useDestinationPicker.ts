import { useCallback, useEffect, useRef } from 'react';
import { isString } from '@aws-amplify/ui';
import { usePaginate } from '../../hooks/usePaginate';
import {
  listLocationItemsHandler,
  ListLocationItemsHandlerInput,
  ListLocationItemsHandlerOutput,
} from '../../../actions/handlers/listLocationItems';
import { useGetActionInput } from '../../../providers/configuration';
import { getDestinationListFullPrefix } from '../utils/getDestinationPickerDataTable';

import { useDataState } from '@aws-amplify/ui-react-core';
import { useStore } from '../../../providers/store';

const DEFAULT_PAGE_SIZE = 1000;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

const DEFAULT_REFRESH_OPTIONS = { ...DEFAULT_LIST_OPTIONS, refresh: true };

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
  onPaginate: (page: number) => void;
  range: [number, number];
} => {
  const previousPathref = useRef<string | null>(null);

  const prefix = getDestinationListFullPrefix(destinationList);

  const locationItemsAction = useCallback(
    async (
      previous: ListLocationItemsHandlerOutput,
      input: ListLocationItemsHandlerInput
    ): Promise<ListLocationItemsHandlerOutput> => {
      const { items, nextToken } = await listLocationItemsHandler(input);
      const newItems =
        previousPathref.current !== input.prefix
          ? items
          : previous.items.concat(items);

      previousPathref.current = prefix;
      return {
        items: newItems,
        nextToken,
      };
    },
    [previousPathref, prefix]
  );

  const [{ data, hasError, isLoading, message }, handleList] = useDataState(
    locationItemsAction,
    {
      items: [],
      nextToken: undefined,
    }
  );

  const getInput = useGetActionInput();

  const { items, nextToken } = data;

  const resultCount = items.length;
  const hasNextToken = !!nextToken;

  const hasValidPrefix = isString(prefix);
  const paginateCallback = () => {
    if (!hasValidPrefix) return;
    handleList({
      config: getInput(),
      prefix: prefix,
      options: { ...DEFAULT_LIST_OPTIONS, nextToken, exclude: 'FILE' },
    });
  };

  const { currentPage, onPaginate, range, highestPageVisited } = usePaginate({
    paginateCallback,
    pageSize: 10,
    resultCount,
    hasNextToken,
  });

  useEffect(() => {
    if (previousPathref.current !== prefix) {
      handleList({
        config: getInput(),
        prefix: prefix,
        options: { ...DEFAULT_REFRESH_OPTIONS, nextToken, exclude: 'FILE' },
      });
    }
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
    onPaginate,
    range,
  };
};
