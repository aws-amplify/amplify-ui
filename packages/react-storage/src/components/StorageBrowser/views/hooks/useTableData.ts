import React, { useMemo, useState } from 'react';

export type SortState<T> = {
  selection: keyof T;
  direction: SortDirection;
};

export type SortDirection = 'ascending' | 'descending' | 'none';

interface TableDataSearchOptions<T> {
  filterFunction: (item: T, searchTerm: string) => boolean;
  searchTerm: string;
}

interface TableDataSortOptions<T> {
  compareFunction: (a: T, b: T, selection: keyof T) => number;
  initialSortSelection: keyof T;
  initialSortDirection?: SortDirection;
}

interface TableDataOptions<T> {
  range: [start: number, end: number];
  searching: TableDataSearchOptions<T>;
  sorting: TableDataSortOptions<T>;
}

interface TableDataActions<T> {
  setSortState: React.Dispatch<React.SetStateAction<SortState<T>>>;
}

interface TableDataResult<T> {
  actions: TableDataActions<T>;
  sortState: SortState<T>;
  items: T[];
}

export function useTableData<T>(
  allItems: T[],
  options: TableDataOptions<T>
): TableDataResult<T> {
  const { range, searching, sorting } = options;
  const { filterFunction, searchTerm } = searching;
  const { compareFunction, initialSortSelection, initialSortDirection } =
    sorting;
  const [sortState, setSortState] = useState<SortState<T>>({
    selection: initialSortSelection,
    direction: initialSortDirection ?? 'ascending',
  });

  const { selection } = sortState;

  const [start, end] = range;

  const rangedItems = useMemo(() => {
    return allItems.slice(start, end);
  }, [allItems, start, end]);

  const filteredItems = useMemo(() => {
    return rangedItems.filter((item) => filterFunction(item, searchTerm));
  }, [searchTerm, rangedItems, filterFunction]);

  const sortedAndFilteredItems = useMemo(() => {
    const { direction } = sortState;
    if (direction === 'ascending') {
      filteredItems.sort((a, b) => compareFunction(a, b, selection));
    } else {
      filteredItems.sort((a, b) => compareFunction(b, a, selection));
    }
    return filteredItems;
  }, [filteredItems, sortState, compareFunction, selection]);

  return {
    sortState,
    actions: {
      setSortState,
    },
    items: sortedAndFilteredItems ?? [],
  };
}
