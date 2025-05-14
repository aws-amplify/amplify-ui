import type { DataTableDateDataCell, SortDirection } from '../../../components';

export const compareContent = (
  { value: a }: DataTableDateDataCell['content'],
  { value: b }: DataTableDateDataCell['content']
): number => {
  if (a === undefined) {
    return b === undefined ? 0 : 1;
  }
  return b === undefined ? -1 : a.getTime() - b.getTime();
};

export const compareDateData = (
  a: DataTableDateDataCell,
  b: DataTableDateDataCell,
  direction: SortDirection
): number =>
  direction === 'ascending'
    ? compareContent(a.content, b.content)
    : compareContent(b.content, a.content);
