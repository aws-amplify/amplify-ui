import { AsyncDataAction } from '@aws-amplify/ui-react-core';
import {
  ListHandler,
  ListHandlerOptions,
  ListHandlerInput,
  ListHandlerOutput,
} from './types';

interface SearchOptions<K> {
  query: string;
  filterKey: keyof K;
}

export interface EnhancedListHandlerOptions<K> extends ListHandlerOptions {
  refresh?: boolean;
  reset?: boolean;
  search?: SearchOptions<K>;
}

interface EnhancedListHandler<T, K>
  extends AsyncDataAction<
    ListHandlerOutput<K>,
    ListHandlerInput<EnhancedListHandlerOptions<K> & T>
  > {}

export const SEARCH_LIMIT = 10000;
export const SEARCH_PAGE_SIZE = 1000;

export const createEnhancedListHandler = <
  T extends ListHandlerOptions<I>,
  K,
  I = never,
>(
  action: ListHandler<ListHandlerInput<T>, ListHandlerOutput<K>>
): EnhancedListHandler<T, K> => {
  return async function listActionHandler(prevState, { options, ...input }) {
    const {
      nextToken: _nextToken,
      refresh,
      reset,
      search,
      ...rest
    } = options ?? {};

    if (reset) {
      return { items: [], nextToken: undefined };
    }

    // collect and filter results on `search`
    if (search) {
      const { query, filterKey } = search;

      const result = [];
      let nextNextToken = _nextToken;
      do {
        const output = await action({
          ...input,
          options: {
            ...rest,
            pageSize: SEARCH_PAGE_SIZE,
            nextToken: nextNextToken,
          } as T,
        });
        result.push(...output.items);
        nextNextToken = output.nextToken;
      } while (nextNextToken && result.length < SEARCH_LIMIT);

      return {
        items: result.filter((item) => {
          const test = item[filterKey];
          if (typeof test === 'string') {
            return test.includes(query);
          }
          return false;
        }),
        nextToken: undefined,
      };
    }

    // ignore provided `nextToken` on `refresh`
    const nextToken = refresh ? undefined : _nextToken;
    const output = await action({
      ...input,
      options: { ...rest, nextToken } as T,
    });

    return {
      items: [...(refresh ? [] : prevState.items), ...output.items],
      nextToken: output.nextToken,
    };
  };
};
