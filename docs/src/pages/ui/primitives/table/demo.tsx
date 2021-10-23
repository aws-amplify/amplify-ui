import * as React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableRow,
  View,
} from '@aws-amplify/ui-react';

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
        <Table caption={tableProps.caption} summary={tableProps.summary}>
          <TableHead>
            <TableRow>
              <TableCell as="th" colspan="3">
                Fruit
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell as="th">Citrus</TableCell>
              <TableCell as="th">Stone Fruit</TableCell>
              <TableCell as="th">Berry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Orange</TableCell>
              <TableCell>Nectarine</TableCell>
              <TableCell>Raspberry</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Grapefruit</TableCell>
              <TableCell>Apricot</TableCell>
              <TableCell>Blueberry</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lime</TableCell>
              <TableCell>Peach</TableCell>
              <TableCell>Strawberry</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </View>
    </View>
  );
};
