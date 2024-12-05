import { WithKey } from '../../../components/types';
import { DataTableProps } from '../../../composables/DataTable';

export type HeaderKeys = 'folder' | 'bucket' | 'permission' | 'action';

export type LocationViewHeaders = WithKey<
  DataTableProps['headers'][number],
  HeaderKeys
>[];
