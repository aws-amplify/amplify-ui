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
  search?: SearchOptions<TItem>;
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
      const items = [];
      let nextToken = undefined;
      do {
        const output = await handler({
          ...input,
          options: { ...rest, pageSize: SEARCH_PAGE_SIZE, nextToken },
        } as TInput);

        items.push(...output.items);
        // eslint-disable-next-line prefer-destructuring
        nextToken = output.nextToken;
      } while (nextToken && items.length < SEARCH_LIMIT);

      return {
        items: searchItems({ items, prefix: input.prefix, options: search }),
        // search limit reached but we still have a next token
        hasExhaustedSearch: !!nextToken,
        nextToken: undefined,
      };
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
