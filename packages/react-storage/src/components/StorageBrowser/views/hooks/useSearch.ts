/*
 Happy Path
 ----------
 User is able to:
 - Filter by file/folder name (Root)
 - Filter by name & Search (Bucket)
 - Filter by file/folder name (Prefix)
 - Filter by Name (Settings)
 */

import React from 'react';
import debounce from 'lodash/debounce';

export interface InitialSearchValues<T> {
  searchTerm?: string;
  searchKey: keyof T;
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

export function useSearch<T>({
  items,
  initialValues,
  onSearch,
}: UseSearchProps<T>): UseSearch<T> {
  const {
    searchTerm: initialSearchTerm,
    searchKey: initialSearchKey,
    debounceDelay,
  } = initialValues;

  const [searchTerm, setSearchTerm] = React.useState(initialSearchTerm ?? '');
  const [searchKey] = React.useState(initialSearchKey);

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

  const handler = debounce((term: string, includeSubfolders?: boolean) => {
    setSearchTerm(term);
    if (typeof onSearch === 'function') {
      onSearch(term, includeSubfolders);
    }
  }, debounceDelay ?? 300);

  return {
    searchTerm,
    filteredItems,
    handleSearch: handler,
  };
}
