import type { DataTableTextDataCell, SortDirection } from '../../../components';

export const compareContent = (
  { text: a }: DataTableTextDataCell['content'],
  { text: b }: DataTableTextDataCell['content']
): number => {
  if (a === undefined) {
    return b === undefined ? 0 : 1;
  }
  return b === undefined ? -1 : a.localeCompare(b);
};

export const compareTextData = (
  a: DataTableTextDataCell,
  b: DataTableTextDataCell,
  direction: SortDirection
): number =>
  direction === 'ascending'
    ? compareContent(a.content, b.content)
    : compareContent(b.content, a.content);
