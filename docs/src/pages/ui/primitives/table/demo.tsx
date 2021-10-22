import * as React from 'react';

import { Table, View } from '@aws-amplify/ui-react';

import { TablePropControls } from '@/components/TablePropControls';
import { useTableProps } from '@/components/useTableProps';

export const TableDemo = () => {
  const tableProps = useTableProps({
    caption: '',
    summary: '',
  });

  return (
    <View>
      <TablePropControls {...tableProps} />
      <View className="mt-8">
        <Table caption={tableProps.caption} summary={tableProps.caption}>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">One</Table.Cell>
              <Table.Cell as="th">Two</Table.Cell>
              <Table.Cell as="th">Three</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Uno</Table.Cell>
              <Table.Cell>Dos</Table.Cell>
              <Table.Cell>Tres</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Ishi</Table.Cell>
              <Table.Cell>Ni</Table.Cell>
              <Table.Cell>San</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </View>
    </View>
  );
};
