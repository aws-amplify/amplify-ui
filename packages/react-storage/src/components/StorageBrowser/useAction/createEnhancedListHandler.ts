import type { AsyncReducer } from '@aws-amplify/ui-react-core';

import type {
  ListHandler,
  ListHandlerOptions,
  ListHandlerInput,
  ListHandlerOutput,
} from '../actions';

import type { SearchOptions } from './searchItems';
import { searchItems } from './searchItems';

export const SEARCH_LIMIT = 10000;
export const SEARCH_PAGE_SIZE = 1000;

export type EnhancedListHandlerOptions<TOptions, TItem> = TOptions & {
  refresh?: boolean;
  reset?: boolean;
  search?: SearchOptions<TItem> & {
    limit?: number;
    onProgress?: (progress: { fetchedCount: number }) => void;
  };
};

export type EnhancedListHandlerInput<
  TInput extends { options?: ListHandlerOptions<any> },
  TItem,
> = Omit<TInput, 'config' | 'options'> & {
  options?: EnhancedListHandlerOptions<TInput['options'], TItem>;
};

export interface EnhancedListHandlerOutput<TItem>
  extends ListHandlerOutput<TItem> {
  hasExhaustedSearch?: boolean;
}

export interface EnhancedListHandler<
  TInput extends { options?: ListHandlerOptions<any> },
  TItem,
> extends AsyncReducer<
    EnhancedListHandlerOutput<TItem>,
    EnhancedListHandlerInput<TInput, TItem>
  > {}

export const createEnhancedListHandler = <
  TInput extends ListHandlerInput<ListHandlerOptions<any>>,
  TItem,
>(
  handler: ListHandler<TInput, ListHandlerOutput<TItem>>
): EnhancedListHandler<TInput, TItem> => {
  let searchCache: {
    prefix: string;
    items: TItem[];
    hasExhaustedSearch: boolean;
  } | null = null;

  return async function listActionHandler(prevState, { options, ...input }) {
    const {
      nextToken: _nextToken,
      refresh,
      reset,
      search,
      ...rest
    } = options ?? {};

    if (reset) {
      searchCache = null;
      return { items: [], nextToken: undefined };
    }

    // collect and filter results on `search`
    if (search) {
      const { limit: searchLimit, onProgress, ...searchOptions } = search;
      let allItems: TItem[];
      let hasExhaustedSearch: boolean;

      if (searchCache && searchCache.prefix === input.prefix && !refresh) {
        allItems = searchCache.items;
        ({ hasExhaustedSearch } = searchCache);
      } else {
        const items: TItem[] = [];
        let nextToken = undefined;
        const limit = searchLimit ?? SEARCH_LIMIT;
        do {
          const output = await handler({
            ...input,
            options: { ...rest, pageSize: SEARCH_PAGE_SIZE, nextToken },
          } as TInput);

          items.push(...output.items);
          // eslint-disable-next-line prefer-destructuring
          nextToken = output.nextToken;

          onProgress?.({ fetchedCount: items.length });
        } while (nextToken && items.length < limit);

        allItems = items;
        hasExhaustedSearch = !!nextToken;

        searchCache = {
          prefix: input.prefix,
          items: allItems,
          hasExhaustedSearch,
        };
      }

      return {
        items: searchItems({
          items: allItems,
          prefix: input.prefix,
          options: searchOptions,
        }),
        hasExhaustedSearch,
        nextToken: undefined,
      };
    }

    if (refresh) {
      searchCache = null;
    }

    // ignore provided `nextToken` on `refresh`
    const nextToken = refresh ? undefined : _nextToken;
    const output = await handler({
      ...input,
      options: { ...rest, nextToken },
    } as TInput);

    const items = [...(refresh ? [] : prevState.items), ...output.items];

    return { ...output, items };
  };
};
