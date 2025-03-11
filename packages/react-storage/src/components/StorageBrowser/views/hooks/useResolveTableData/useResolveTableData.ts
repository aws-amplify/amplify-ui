import React from 'react';

import { DataTableProps } from '../../../composables/DataTable';

import { DataTableResolvers } from './types';

export default function useResolveDataTable<
  K extends string,
  TItem = {},
  TProps = {},
>(
  keys: readonly K[] | K[],
  { getCell, getHeader, getRowKey }: DataTableResolvers<K, TProps, TItem>,
  { items, props }: { items?: TItem[]; props: TProps }
): DataTableProps {
  return React.useMemo(() => {
    const getRows = (item: TItem) => ({
      key: getRowKey({ item, props }),
      content: keys.map((key) => getCell({ key, item, props })),
    });

    const headers = keys.map((key) => getHeader({ key, props }));
    const rows = (items ?? []).map(getRows);

    return { headers, rows };
  }, [keys, getCell, getHeader, getRowKey, items, props]);
}
