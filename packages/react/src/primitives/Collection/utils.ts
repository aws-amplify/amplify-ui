import { strHasLength } from '../shared/utils';

/**
 * Slice a collection based on page index (starting at 1)
 */
export const getItemsAtPage = <T>(
  items: T[],
  page: number,
  itemsPerPage: number
) => {
  if (page < 1 || itemsPerPage < 1) {
    return [];
  }

  const startIndex = (page - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
};

/**
 * Recursively find a keyword within an object (case insensitive)
 */
export const itemHasText = (item: unknown, text: string): boolean => {
  if (strHasLength(item)) {
    return item.toLowerCase().includes(text.toLowerCase());
  }

  if (typeof item === 'object') {
    return Object.values(item).some((subItem) => itemHasText(subItem, text));
  }

  return false;
};

/**
 * Computes the amount of available pages
 */
export const getPageCount = (totalItems: number, itemsPerPage: number) =>
  Math.ceil(totalItems / itemsPerPage);
