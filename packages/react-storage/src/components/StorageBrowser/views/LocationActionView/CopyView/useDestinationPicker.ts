import { useEffect } from 'react';
import { isString } from '@aws-amplify/ui';
import { usePaginate } from '../../hooks/usePaginate';
import {
  listLocationItemsHandler,
  ListLocationItemsHandlerOutput,
} from '../../../actions';
import { useGetActionInput } from '../../../providers/configuration';
import { getDestinationListFullPrefix } from '../utils/getDestinationPickerDataTable';

import { useDataState } from '@aws-amplify/ui-react-core';
import { useStore } from '../../../providers/store';
import { createEnhancedListHandler } from '../../../actions/createEnhancedListHandler';

const DEFAULT_PAGE_SIZE = 1000;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
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
  hasError: boolean;
  message: string | undefined;
  handleNext: () => void;
  handlePrevious: () => void;
  onSearch: (query: string) => void;
  range: [number, number];
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

  const resultCount = items.length;
  const hasNextToken = !!nextToken;

  const hasValidPrefix = isString(prefix);
  const onPaginateNext = () => {
    if (!hasValidPrefix) return;
    handleList({
      config: getInput(),
      prefix: prefix,
      options: { ...DEFAULT_LIST_OPTIONS, nextToken, exclude: 'FILE' },
    });
  };

  const { currentPage, handlePaginateNext, handlePaginatePrevious, range } =
    usePaginate({
      onPaginateNext,
      pageSize: 10,
    });

  useEffect(() => {
    handleList({
      config: getInput(),
      prefix: prefix,
      options: { ...DEFAULT_REFRESH_OPTIONS, nextToken, exclude: 'FILE' },
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
    hasError,
    message,
    handleNext: () => {
      handlePaginateNext({ resultCount, hasNextToken });
    },
    handlePrevious: () => {
      handlePaginatePrevious();
    },
    onSearch: (query: string) => {
      if (!hasValidPrefix) return;
      handleList({
        config: getInput(),
        prefix: prefix,
        options: {
          ...DEFAULT_LIST_OPTIONS,
          nextToken,
          exclude: 'FILE',
          search: { query, filterKey: 'key' },
        },
      });
    },
    range,
  };
};
