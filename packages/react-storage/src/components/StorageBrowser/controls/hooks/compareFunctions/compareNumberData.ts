import type {
  DataTableNumberDataCell,
  SortDirection,
} from '../../../components';

export const compareContent = (
  { value: a }: DataTableNumberDataCell['content'],
  { value: b }: DataTableNumberDataCell['content']
): number => {
  if (a === undefined) {
    return b === undefined ? 0 : 1;
  }
  return b === undefined ? -1 : a - b;
};

export const compareNumberData = (
  a: DataTableNumberDataCell,
  b: DataTableNumberDataCell,
  direction: SortDirection
): number =>
  direction === 'ascending'
    ? compareContent(a.content, b.content)
    : compareContent(b.content, a.content);
