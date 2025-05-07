import type {
  DataTableButtonDataCell,
  SortDirection,
} from '../../../components';

const compareContent = (
  { label: a }: DataTableButtonDataCell['content'],
  { label: b }: DataTableButtonDataCell['content']
): number => {
  if (a === undefined) {
    return b === undefined ? 0 : 1;
  }
  return b === undefined ? -1 : a.localeCompare(b);
};

export const compareButtonData = (
  a: DataTableButtonDataCell,
  b: DataTableButtonDataCell,
  direction: SortDirection
): number =>
  direction === 'ascending'
    ? compareContent(a.content, b.content)
    : compareContent(b.content, a.content);
