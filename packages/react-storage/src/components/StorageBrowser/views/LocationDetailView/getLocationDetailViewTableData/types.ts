import { DataTableProps } from '../../../composables/DataTable';
import { WithKey } from '../../../components/types';

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
