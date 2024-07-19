import { useCallback, useState } from 'react';
import { Column, ILocation, SortDirection } from '../Views/Controls/Table';

export interface CompareFnType {
  (a: any, b: any): number;
}

function CompareFn(a: string, b: string): number;
function CompareFn(a: number, b: number): number;
function CompareFn(a: string | number, b: string | number): number {
  const isDateString = (s: string) => !isNaN(Date.parse(s));

  if (typeof a === 'string' && typeof b === 'string') {
    if (isDateString(a) && isDateString(b)) {
      // Compare strings as dates
      return new Date(a).getTime() - new Date(b).getTime();
    }

    // Otherwise, compare them as regular strings
    return a.localeCompare(b);
  } else if (typeof a === 'number' && typeof b === 'number') {
    // Compare numbers
    return a - b;
  }
  throw new Error('Invalid arguments');
}

interface ISortState<T> {
  key: keyof T;
  direction: SortDirection;
}

interface UseSortHandlerResult<T extends ILocation> {
  rowData: T[];
  sortState: ISortState<T>;
  handleSort: (column: Column<T>) => void;
}

export const useSortHandler = <T extends ILocation>(
  rows: T[],
  compareFn: CompareFnType = CompareFn
): UseSortHandlerResult<T> => {
  const [originalRowData, _] = useState<T[]>(rows);
  const [rowData, setRowData] = useState<T[]>(rows);
  const [sortState, setSortState] = useState<{
    key: keyof T;
    direction: SortDirection;
  }>({ key: 'name', direction: 'none' });

  const handleSort = useCallback(
    (column: Column<T>) => {
      setSortState((prevConfig) => {
        let direction: SortDirection = 'none';

        if (prevConfig.key === column.key) {
          // Cycle the sort for the same column: none -> asc -> desc -> loop back to none
          if (prevConfig.direction === 'ascending') {
            direction = 'descending';
          } else if (prevConfig.direction === 'descending') {
            direction = 'none';
          } else {
            direction = 'ascending';
          }
        } else {
          // Sorting with a different column, so start at asc
          direction = 'ascending';
        }

        let sorted = [...originalRowData];

        if (direction !== 'none') {
          sorted.sort((a, b) => {
            if (direction === 'ascending') {
              return compareFn(a[column.key], b[column.key]);
            }

            if (direction === 'descending') {
              return compareFn(b[column.key], a[column.key]);
            }

            return 0;
          });
        } else {
          sorted = originalRowData;
        }

        setRowData(sorted);

        return { key: column.key, direction };
      });
    },
    [compareFn, originalRowData]
  );

  return { rowData, sortState, handleSort };
};
