import React, { useEffect, useRef, useState } from 'react';
import { isString } from '@aws-amplify/ui';
import { usePaginate } from '../../hooks/usePaginate';
import {
  listLocationItemsHandler,
  ListLocationItemsHandlerInput,
  ListLocationItemsHandlerOutput,
} from '../../../actions/handlers/listLocationItems';
import { useGetActionInput } from '../../../providers/configuration';
// const {
//   useDataState,
// } from '@aws-amplify/ui-react-core';

const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';
const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

const DEFAULT_REFRESH_OPTIONS = { ...DEFAULT_LIST_OPTIONS, refresh: true };

const useLocationItems = () => {
  const [data, setData] = useState<ListLocationItemsHandlerOutput>({
    items: [],
    nextToken: undefined,
  });
  const prevPref = useRef<string>('');
  const handleList = async (input: ListLocationItemsHandlerInput) => {
    console.log('input', input);
    const { items, nextToken } = await listLocationItemsHandler({
      config: input.config,
      prefix: input.prefix,
      options: input.options,
    });
    console.log('input', items, 'nextToken', nextToken);
    const newItems =
      prevPref.current !== input.prefix ? items : data.items.concat(items);
    const newData = { items: newItems, nextToken };
    setData(newData);
  };

  return [data, handleList] as const;
};

export const useDestinationPicker = ({
  destinationPrefix,
}: {
  destinationPrefix: string[];
}): {
  items: ListLocationItemsHandlerOutput['items'];
  hasNextToken: boolean;
  currentPage: number;
  isLoading: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
  range: [number, number];
} => {
  const previousPathref = useRef('');
  const [data, handleList] = useLocationItems();

  const getInput = useGetActionInput();

  const { items, nextToken } = data;
  const isLoading = items.length == 0;
  const resultCount = items.length;
  const hasNextToken = !!nextToken;

  const hasValidPath = isString(destinationPrefix.join());
  const onPaginateNext = () => {
    if (!hasValidPath) return;

    handleList({
      config: getInput(),
      prefix: `${destinationPrefix.join('/')}/`,
      options: { ...DEFAULT_LIST_OPTIONS, nextToken },
    });
  };

  const { currentPage, handlePaginateNext, handlePaginatePrevious, range } =
    usePaginate({
      onPaginateNext,
      pageSize: 10,
    });
  console.log('currentPage', currentPage, 'range', range);

  useEffect(() => {
    const newPath = `${destinationPrefix.join('/')}/`;
    if (previousPathref.current !== newPath) {
      handleList({
        config: getInput(),
        prefix: newPath,
        options: { ...DEFAULT_REFRESH_OPTIONS, nextToken },
      });
    }
    previousPathref.current = newPath;
  }, [getInput, handleList, nextToken, destinationPrefix]);

  return {
    items,
    hasNextToken,
    currentPage,
    isLoading,
    handleNext: () => {
      handlePaginateNext({ resultCount, hasNextToken });
    },
    handlePrevious: () => {
      handlePaginatePrevious();
    },
    range,
  };
};
