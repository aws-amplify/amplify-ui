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

function filter<K>(items: K[], key: keyof K, term: string) {
  return items.filter((item) => {
    const test = item[key];
    if (typeof test === 'string') {
      return test.includes(term);
    }
  });
}

export const SEARCH_LIMIT = 10000;
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
        const output = await action({ ...input, options });
        result.push(...output.items);
        nextNextToken = output.nextToken;
      } while (nextNextToken && result.length < SEARCH_LIMIT);

      return {
        items: filter<K>(result, filterKey, query),
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
      items: [...(refresh ? [] : prevState.items)],
      nextToken: output.nextToken,
    };
  };
};
