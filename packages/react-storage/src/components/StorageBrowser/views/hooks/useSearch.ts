import React from 'react';
import debounce from 'lodash/debounce';

const DEFAULT_DELAY = 300;
export interface InitialSearchValues<T> {
  searchKey: keyof T;
  searchTerm?: string;
  debounceDelay?: number;
}

interface UseSearchProps<T> {
  initialValues: InitialSearchValues<T>;
  items: T[];
  onSearch: (term: string, includeSubfolders?: boolean) => void;
}

interface UseSearch<T> {
  filteredItems: T[];
  searchTerm: string;
  handleSearch: (term: string, includeSubfolders?: boolean) => void;
}

/**
 * Custom hook to search a list of items based on a search key and search term.
 * @template T - The type of items in the search list.
 * @param {UseSearchProps<T>} props
 * @returns {UseSearch<T>} - The search results, current term, and handler.
 */
export function useSearch<T>({
  items,
  initialValues: initialSearchValues,
  onSearch,
}: UseSearchProps<T>): UseSearch<T> {
  const [initialValues] = React.useState(initialSearchValues);
  const {
    searchTerm: initialSearchTerm = '',
    searchKey,
    debounceDelay = DEFAULT_DELAY,
  } = initialValues;

  const [searchTerm, setSearchTerm] = React.useState(initialSearchTerm);

  const filteredItems = React.useMemo(
    () =>
      items.filter((item) => {
        const test = item[searchKey];
        if (typeof test === 'string') {
          return test.includes(searchTerm);
        }
      }),
    [items, searchKey, searchTerm]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandler = React.useCallback(
    debounce((term: string, includeSubfolders?: boolean) => {
      setSearchTerm(term);
      if (typeof onSearch === 'function') {
        onSearch(term, includeSubfolders);
      }
    }, debounceDelay),
    [onSearch, debounceDelay]
  );

  // clean up handler on unmount
  React.useEffect(() => {
    return () => {
      debouncedHandler.cancel();
    };
  }, [debouncedHandler]);

  return {
    searchTerm,
    filteredItems,
    handleSearch: debouncedHandler,
  };
}
