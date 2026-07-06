import React from 'react';

import type { LocationItemData } from '../../actions';

import type { SortField, SortConfig } from './sortItems';
import { sortItems } from './sortItems';

import type { HeaderKeys } from '../LocationDetailView/getLocationDetailViewTableData/types';

export interface UseSortInput {
  items: LocationItemData[] | undefined;
}

export interface UseSortState {
  /** Items sorted by the current sort configuration */
  sortedItems: LocationItemData[];
  /** Current sort column and direction, undefined when using default order */
  sortConfig: SortConfig | undefined;
  /**
   * Callback for sort header clicks.
   * @param headerKey - The header key from the DataTable column
   */
  onSort: (headerKey: HeaderKeys) => void;
  /** Resets sort state back to default (no sorting) */
  resetSort: () => void;
}

const SORTABLE_HEADERS: HeaderKeys[] = [
  'name',
  'type',
  'last-modified',
  'size',
];

const isSortableHeader = (key: HeaderKeys): key is SortField =>
  SORTABLE_HEADERS.includes(key);

/**
 * Manages sort state for location detail items and returns sorted items.
 *
 * Sorting is applied to the full items array before pagination, enabling
 * cross-page sorting. When no sort is active, items are returned as-is.
 *
 * @param input.items - The full array of items (across all pages)
 * @returns Sorted items plus sort state and handlers
 */
export const useSort = ({ items }: UseSortInput): UseSortState => {
  const [sortConfig, setSortConfig] = React.useState<SortConfig | undefined>(
    undefined
  );

  const resetSort = React.useRef(() => {
    setSortConfig(undefined);
  }).current;

  const onSort = React.useCallback((headerKey: HeaderKeys) => {
    if (!isSortableHeader(headerKey)) return;

    setSortConfig((prev) => ({
      field: headerKey,
      direction:
        prev?.field === headerKey
          ? prev.direction === 'ascending'
            ? 'descending'
            : 'ascending'
          : 'ascending',
    }));
  }, []);

  const sortedItems = React.useMemo(() => {
    if (!items) return [];
    if (!sortConfig) return items;
    return sortItems(items, sortConfig);
  }, [items, sortConfig]);

  return { sortedItems, sortConfig, onSort, resetSort };
};
