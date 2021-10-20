import * as React from 'react';

import { Table, View } from '@aws-amplify/ui-react';

import { TablePropControls } from '@/components/TablePropControls';
import { useTableProps } from '@/components/useTableProps';

export const TableDemo = () => {
  const tableProps = useTableProps({
    highlightOnHover: false,
    pagination: 'infinite-scroll',
    selectable: false,
    size: 'small',
    stickyHeader: false,
    variation: 'bordered',
  });

  return (
    <View>
      <TablePropControls {...tableProps} />
      <View className="mt-8">
        <Table
          highlightOnHover={tableProps.highlightOnHover}
          name="numbers"
          pagination={tableProps.pagination}
          selectable={tableProps.selectable}
          size={tableProps.size}
          stickyHeader={tableProps.stickyHeader}
          variation={tableProps.variation}
        />
      </View>
    </View>
  );
};
