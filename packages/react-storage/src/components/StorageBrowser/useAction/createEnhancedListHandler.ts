import type { AsyncReducer } from '@aws-amplify/ui-react-core';

import type {
  ListHandler,
  ListHandlerOptions,
  ListHandlerInput,
  ListHandlerOutput,
} from '../actions';

type KeyWithStringValue<T> = keyof {
  [P in keyof T as T[P] extends string ? P : never]: T[P];
};

interface SearchOptions<T> {
  query: string;
  /**
   * The key of the object in the list to filter by, which must have a string value.
   * Also accepts a function which takes an item and returns the appropriate key.
   * This determines where the `query` will be searched.
   */
  filterBy: KeyWithStringValue<T> | ((item: T) => KeyWithStringValue<T>);

  /**
   * Optional delimiter to group item keys.
   */
  groupBy?: string;
}

export interface EnhancedListHandlerOptions<T, K>
  extends ListHandlerOptions<K> {
  refresh?: boolean;
  reset?: boolean;
  search?: SearchOptions<T>;
}

export interface SearchOutput {
  hasExhaustedSearch: boolean;
}

export interface EnhancedListHandlerOutput<T> extends ListHandlerOutput<T> {
  search?: SearchOutput;
}

export interface EnhancedListHandlerInput<T, K>
  extends Omit<ListHandlerInput<EnhancedListHandlerOptions<T, K>>, 'config'> {}

export interface EnhancedListHandler<T, K>
  extends AsyncReducer<
    EnhancedListHandlerOutput<T>,
    EnhancedListHandlerInput<T, K>
  > {}

type ListItem<Action> = Action extends ListHandler<
  any,
  ListHandlerOutput<infer T>
>
  ? T
  : never;

type Options<Action> = Action extends ListHandler<
  Omit<ListHandlerInput<ListHandlerOptions<infer E>>, 'config'>
>
  ? E
  : never;

export const SEARCH_LIMIT = 10000;
export const SEARCH_PAGE_SIZE = 1000;

/**
 * Normalizes and converts a string to lower case,
 * handling Unicode characters and locale-specific case mappings.
 * Uses NFKD to fully decompose unicode: https://unicode.org/reports/tr15/#Normalization_Forms_Table
 */
function normalize(input: string) {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritic modifiers
    .toLocaleLowerCase();
}

/**
 * Performs a case-insensitive check to determine if a string includes another string,
 * handling Unicode characters and locale-specific case mappings.
 *
 * @param {string} input - The string to search within.
 * @param {string} query - The substring to search for.
 * @returns {boolean} - Returns `true` if `query` is found in `input` (case-insensitively), otherwise `false`.
 *
 * @example
 * caseInsensitiveIncludes("Photos", "photo"); // true
 * caseInsensitiveIncludes("Hello", "HELLO");   // true
 * caseInsensitiveIncludes("\uFB00", "\u0046\u0046");   // ﬀ = FF true
 * caseInsensitiveIncludes("Cafè", "cafe");   // true
 */
function caseInsensitiveIncludes(input: string, query: string): boolean {
  return normalize(input).includes(normalize(query));
}

interface Search<T> {
  prefix?: string;
  list: T[];
  options: SearchOptions<T>;
}

export function searchItems<T>({ prefix = '', list, options }: Search<T>): T[] {
  const { query, filterBy, groupBy } = options;

  // filter keys that match `filterBy` search option
  const filteredItems = list.filter((item) => {
    const key = typeof filterBy === 'function' ? filterBy(item) : filterBy;
    const path = item[key] as string;
    const suffix = path.slice(prefix.length);
    return caseInsensitiveIncludes(suffix, query);
  });

  if (!groupBy) {
    return filteredItems;
  }

  // group items using the provided grouping delimiter
  const uniquePaths = new Map<string, T>();

  for (const item of filteredItems) {
    const key = typeof filterBy === 'function' ? filterBy(item) : filterBy;
    const path = item[key] as string;
    const components = path.split(groupBy);

    for (const [i, component] of components.entries()) {
      if (!caseInsensitiveIncludes(component, query)) {
        continue;
      }

      // list of components ending with match
      const matchedPathSegments = components.slice(0, i + 1);

      // create new path
      let matchedPath = matchedPathSegments.join(groupBy);
      const isFolder = matchedPath !== path;
      if (isFolder) {
        matchedPath += groupBy;
      }

      // ignore anything below the prefix for matching
      if (matchedPath.length > prefix.length && !uniquePaths.has(matchedPath)) {
        // add a new item
        uniquePaths.set(matchedPath, {
          ...item,
          id: crypto.randomUUID(),
          [key]: matchedPath,
          type: isFolder ? 'FOLDER' : 'FILE',
        });
      }
    }
  }

  return Array.from(uniquePaths.values());
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
          options: search,
        }),
        search: {
          // search limit reached but we still have a next token
          hasExhaustedSearch: !!nextNextToken,
        },
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
