import { AsyncDataAction } from '@aws-amplify/ui-react-core';

import {
  ListHandler,
  ListHandlerOptions,
  ListHandlerInput,
  ListHandlerOutput,
} from './handlers';

interface SearchOptions<T> {
  query: string;
  filterKey: keyof T;
}

export interface EnhancedListHandlerOptions<T, K>
  extends ListHandlerOptions<K> {
  refresh?: boolean;
  reset?: boolean;
  search?: SearchOptions<T>;
}

interface EnhancedListHandler<T, K>
  extends AsyncDataAction<
    ListHandlerOutput<T>,
    ListHandlerInput<EnhancedListHandlerOptions<T, K> & { delimiter?: string }>
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

interface Search<T> {
  prefix: string;
  delimiter?: string;
  list: T[];
  searchOptions: SearchOptions<T>;
}

function searchItems<T>({
  prefix,
  delimiter,
  list,
  searchOptions,
}: Search<T>): T[] {
  const { filterKey, query } = searchOptions;

  if (delimiter) {
    return list.filter((item) => {
      const test = item[filterKey];
      if (typeof test === 'string') {
        const [, suffix] = test.split(prefix);
        return suffix.includes(query);
      }
      return false;
    });
  }

  const outputSet = new Set();
  const items = [];

  for (const item of list) {
    const value = item[filterKey];
    if (typeof value !== 'string') {
      continue;
    }
    const prefixIndex = value.indexOf(prefix);
    if (prefixIndex === -1) {
      continue;
    }
    const suffix = value.substring(prefixIndex + prefix.length);

    if (!suffix.includes(query)) {
      continue;
    }
    const segments = value.split('/');

    for (let i = 0; i < segments.length; i++) {
      if (segments[i].includes(query)) {
        const pathUpToSegment = segments.slice(0, i + 1).join('/');
        const isFile = i === segments.length - 1 && !value.endsWith('/');
        if (!outputSet.has(pathUpToSegment)) {
          items.push({
            ...item,
            [filterKey]: isFile ? pathUpToSegment : pathUpToSegment + '/',
            id: crypto.randomUUID(),
            type: isFile ? 'FILE' : 'FOLDER',
          });
          outputSet.add(pathUpToSegment);
        }
      }
    }
  }

  return items;
}

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
      const result = [];
      let nextNextToken = undefined;
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
        items: searchItems({
          list: result,
          prefix: input.prefix,
          searchOptions: search,
          delimiter: rest.delimiter,
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
