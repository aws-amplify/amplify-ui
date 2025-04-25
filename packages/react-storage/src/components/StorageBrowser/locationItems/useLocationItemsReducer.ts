import React from 'react';

import type { LocationItemData } from '../actions';
import type { LocationState } from '../store';
import { useList } from '../useAction';

import { usePaginate } from '../views/hooks/usePaginate';
import { useHasValueUpdated } from '@aws-amplify/ui-react-core';

interface LocationItemsState {
  hasError: boolean;
  hasExhaustedSearch: boolean;
  hasNextPage: boolean;
  highestPageVisited: number;
  isLoading: boolean;
  message: string | undefined;
  page: number;
  pageItems: LocationItemData[];
}

type LocationItemsAction =
  | {
      type: 'INITIALIZE';
      includeSubfolders?: boolean;
      query?: { value?: string; page?: number };
    }
  | { type: 'PAGINATE'; page: number }
  | { type: 'REFRESH' }
  | { type: 'RESET' }
  | { type: 'SEARCH'; query: { value: string; includeSubfolders: boolean } };

export type LocationItemsContextType = [
  LocationItemsState,
  React.Dispatch<LocationItemsAction>,
];

export default function useLocationItemsReducer(
  location: LocationState,
  options?: {
    delimiter?: string;
    pageSize?: number;
  }
): [LocationItemsState, React.Dispatch<LocationItemsAction>] {
  const { pageSize, delimiter } = options ?? {};

  const { current, key: prefix } = location ?? {};

  const [
    {
      value: { items, nextToken, hasExhaustedSearch = false },
      isLoading,
      hasError,
      message,
    },
    handleList,
  ] = useList('locationItems');

  const { page, handlePaginate, handleReset, highestPageVisited, pageItems } =
    usePaginate({ items, pageSize });

  const hasUpdatedPrefix = useHasValueUpdated(prefix);
  React.useEffect(() => {
    if (hasUpdatedPrefix) {
      handleList({ prefix, options: { delimiter, pageSize, refresh: true } });
      handleReset();
    }
  }, [delimiter, handleList, handleReset, hasUpdatedPrefix, pageSize, prefix]);

  const dispatch: React.Dispatch<LocationItemsAction> = React.useCallback(
    (action) => {
      const options = { delimiter, pageSize };
      switch (action.type) {
        case 'PAGINATE': {
          if (action.page < 1) return;

          handlePaginate(action.page);

          if (!nextToken) return;

          handleList({ prefix, options: { delimiter, nextToken, pageSize } });
          break;
        }
        case 'REFRESH': {
          handleReset();

          handleList({ prefix, options: { ...options, refresh: true } });
          break;
        }
        // case 'INITIALIZE': {
        //   handleList({ prefix, options: { ...options, refresh: true } });
        //   handleReset();
        //   break;
        // }
        case 'RESET': {
          // reset to `current.prefix`
          handleList({
            prefix: current?.prefix ?? '',
            options: { reset: true },
          });
          break;
        }
        case 'SEARCH': {
          const {
            query: { value: query, includeSubfolders },
          } = action;
          const searchOptions = {
            ...options,
            delimiter: includeSubfolders ? undefined : delimiter,
            search: {
              filterBy: 'key' as const,
              groupBy: includeSubfolders ? delimiter : undefined,
              query,
            },
          };

          handleReset();
          handleList({ prefix, options: searchOptions });
          break;
        }
      }
    },
    [
      current?.prefix,
      delimiter,
      handleList,
      handlePaginate,
      handleReset,
      nextToken,
      pageSize,
      prefix,
    ]
  );

  return [
    {
      hasError,
      hasExhaustedSearch,
      hasNextPage: !!nextToken,
      highestPageVisited,
      isLoading,
      message,
      page,
      pageItems,
    },
    dispatch,
  ];
}
