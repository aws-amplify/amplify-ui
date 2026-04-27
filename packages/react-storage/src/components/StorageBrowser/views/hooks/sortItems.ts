import type { LocationItemData } from '../../actions';
import type { SortDirection } from '../../components';

/**
 * Sort field identifiers matching the LocationDetailView table columns.
 */
export type SortField = 'name' | 'type' | 'last-modified' | 'size';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

const getFileName = (item: LocationItemData): string => item.key;

const getFileType = (item: LocationItemData): string => {
  if (item.type === 'FOLDER') return '';
  const parts = item.key.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

const getLastModified = (item: LocationItemData): number | undefined =>
  item.type === 'FILE' ? item.lastModified.getTime() : undefined;

const getSize = (item: LocationItemData): number | undefined =>
  item.type === 'FILE' ? item.size : undefined;

const compareStrings = (a: string, b: string): number => a.localeCompare(b);

const compareOptionalNumbers = (
  a: number | undefined,
  b: number | undefined
): number => {
  if (a === undefined) return b === undefined ? 0 : 1;
  return b === undefined ? -1 : a - b;
};

/**
 * Sorts an array of `LocationItemData` items by the given field and direction.
 *
 * Preserves the same grouping behavior as `useDataTable`: folders and files are
 * sorted as separate groups and concatenated in order (folders first ascending,
 * files first descending). Items within each group are sorted by the specified field.
 *
 * @param items - The full array of items to sort (across all pages)
 * @param config - Sort configuration with field and direction
 * @returns A new sorted array (does not mutate the input)
 */
export const sortItems = (
  items: LocationItemData[],
  config: SortConfig
): LocationItemData[] => {
  const { field, direction } = config;

  const folders = items.filter((item) => item.type === 'FOLDER');
  const files = items.filter((item) => item.type === 'FILE');

  const comparator = (a: LocationItemData, b: LocationItemData): number => {
    let result: number;
    switch (field) {
      case 'name':
        result = compareStrings(getFileName(a), getFileName(b));
        break;
      case 'type':
        result = compareStrings(getFileType(a), getFileType(b));
        break;
      case 'last-modified':
        result = compareOptionalNumbers(getLastModified(a), getLastModified(b));
        break;
      case 'size':
        result = compareOptionalNumbers(getSize(a), getSize(b));
        break;
      default:
        result = 0;
    }
    return direction === 'ascending' ? result : -result;
  };

  const sortedFolders = [...folders].sort(comparator);
  const sortedFiles = [...files].sort(comparator);

  return direction === 'ascending'
    ? [...sortedFolders, ...sortedFiles]
    : [...sortedFiles, ...sortedFolders];
};
