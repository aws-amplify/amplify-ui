type KeyWithStringValue<T> = keyof {
  [P in keyof T as T[P] extends string ? P : never]: T[P];
};

export interface SearchOptions<TItem> {
  query: string;
  /**
   * The key of the object in the list to filter by, which must have a string value.
   * Also accepts a function which takes an item and returns the appropriate key.
   * This determines where the `query` will be searched.
   */
  filterBy:
    | KeyWithStringValue<TItem>
    | ((item: TItem) => KeyWithStringValue<TItem>);

  /**
   * Optional delimiter to group item keys.
   */
  groupBy?: string;
}

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

export function searchItems<T>({
  prefix = '',
  items,
  options,
}: {
  prefix?: string;
  items: T[];
  options: SearchOptions<T>;
}): T[] {
  const { query, filterBy, groupBy } = options;

  // filter keys that match `filterBy` search option
  const filteredItems = items.filter((item) => {
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
