import type { DataTableProps, WithKey } from '../../../components';

export type HeaderKeys =
  | 'checkbox'
  | 'name'
  | 'type'
  | 'last-modified'
  | 'size'
  | 'download';

export type LocationDetailViewHeaders = WithKey<
  DataTableProps['headers'][number],
  HeaderKeys
>[];
