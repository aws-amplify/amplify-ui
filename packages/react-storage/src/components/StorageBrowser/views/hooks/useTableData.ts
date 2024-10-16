import React, { useMemo, useState } from 'react';

export type SortState<T> = {
  selection: keyof T;
  direction: SortDirection;
};

export type SortDirection = 'ascending' | 'descending' | 'none';

interface TableDataSortOptions<T> {
  compareFunction: (a: T, b: T, selection: keyof T) => number;
  initialSortSelection: keyof T;
  initialSortDirection?: SortDirection;
}

interface TableDataOptions<T> {
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
  items: T[],
  options: TableDataOptions<T>
): TableDataResult<T> {
  const { sorting } = options;

  const { compareFunction, initialSortSelection, initialSortDirection } =
    sorting;
  const [sortState, setSortState] = useState<SortState<T>>({
    selection: initialSortSelection,
    direction: initialSortDirection ?? 'ascending',
  });

  const { selection } = sortState;

  const sortedItems = useMemo(() => {
    const { direction } = sortState;
    if (direction === 'ascending') {
      items.sort((a, b) => compareFunction(a, b, selection));
    } else {
      items.sort((a, b) => compareFunction(b, a, selection));
    }
    return items;
  }, [items, sortState, compareFunction, selection]);

  return {
    sortState,
    actions: {
      setSortState,
    },
    items: sortedItems ?? [],
  };
}
