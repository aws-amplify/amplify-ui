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

export interface EnhancedListHandlerOptions<K, I>
  extends ListHandlerOptions<I> {
  refresh?: boolean;
  reset?: boolean;
  search?: SearchOptions<K>;
}

interface EnhancedListHandler<K, I>
  extends AsyncDataAction<
    ListHandlerOutput<K>,
    ListHandlerInput<EnhancedListHandlerOptions<K, I>>
  > {}

type ListItem<Action> = Action extends ListHandler<
  any,
  ListHandlerOutput<infer T>
>
  ? T
  : never;

type Options<Action> = Action extends ListHandler<
  ListHandlerInput<ListHandlerOptions<infer E>>
>
  ? E
  : never;

export const SEARCH_LIMIT = 10000;
export const SEARCH_PAGE_SIZE = 1000;

export const createEnhancedListHandler = <Action extends ListHandler>(
  action: Action
): EnhancedListHandler<ListItem<Action>, Options<Action>> => {
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
        const output = (await action({
          ...input,
          options: {
            ...rest,
            pageSize: SEARCH_PAGE_SIZE,
            nextToken: nextNextToken,
          },
        })) as ListHandlerOutput<ListItem<Action>>;
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
    const output = (await action({
      ...input,
      options: { ...rest, nextToken },
    })) as ListHandlerOutput<ListItem<Action>>;

    return {
      items: [...(refresh ? [] : prevState.items), ...output.items],
      nextToken: output.nextToken,
    };
  };
};
