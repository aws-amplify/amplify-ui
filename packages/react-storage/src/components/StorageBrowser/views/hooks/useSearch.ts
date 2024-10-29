import React from 'react';

export interface InitialSearchValues<T> {
  searchKey: keyof T;
  searchTerm?: string;
}

interface UseSearchProps<T> {
  initialValues: InitialSearchValues<T>;
  items: T[];
  onSearch?: (term: string, includeSubfolders?: boolean) => void;
}

interface UseSearchResult<T> {
  filteredItems: T[];
  searchTerm: string;
  onSearch: (term: string, includeSubfolders?: boolean) => void;
}

/**
 * Custom hook to search a list of items based on a search key and search term.
 * @template T - The type of items in the search list.
 * @param {UseSearchProps<T>} props
 * @returns {UseSearchResult<T>} - The search results, current term, and handler.
 */
export function useSearch<T>({
  items,
  initialValues: initialValuesProp,
  onSearch,
}: UseSearchProps<T>): UseSearchResult<T> {
  const initialValues = React.useRef(initialValuesProp);
  const { searchTerm: initialSearchTerm = '', searchKey } =
    initialValues.current;

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

  const handleSearch = React.useCallback(
    (term: string, includeSubfolders?: boolean) => {
      setSearchTerm(term);
      if (typeof onSearch === 'function') {
        onSearch(term, includeSubfolders);
      }
    },
    [setSearchTerm, onSearch]
  );

  return {
    searchTerm,
    filteredItems,
    onSearch: handleSearch,
  };
}
