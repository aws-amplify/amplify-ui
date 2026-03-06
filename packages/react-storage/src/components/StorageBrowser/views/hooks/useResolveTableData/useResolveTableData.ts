import React from 'react';

import type { DataTableProps } from '../../../components';

import type { DataTableResolvers } from './types';

export default function useResolveTableData<K extends string, TItem, TProps>(
  keys: readonly K[] | K[],
  { getCell, getHeader, getRowKey }: DataTableResolvers<K, TProps, TItem>,
  { items, props }: { items?: TItem[]; props: TProps }
): DataTableProps {
  return React.useMemo(() => {
    const getRow = (item: TItem) => ({
      key: getRowKey({ item, props }),
      content: keys.map((key) => getCell({ key, item, props })),
    });

    const headers = keys.map((key) => getHeader({ key, props }));
    const rows = (items ?? []).map(getRow);

    return { headers, rows };
  }, [getCell, getHeader, getRowKey, keys, items, props]);
}
