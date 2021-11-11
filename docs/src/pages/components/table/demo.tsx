import * as React from 'react';

import {
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { TablePropControls } from '@/components/TablePropControls';
import { useTableProps } from '@/components/useTableProps';

export const TableDemo = () => {
  const tableProps = useTableProps({});

  return (
    <Flex direction="column" gap="0.5rem">
      <TablePropControls {...tableProps} />
      <Example>
        <Table
          caption={tableProps.caption}
          highlightOnHover={tableProps.highlightOnHover}
          size={tableProps.size}
          variation={tableProps.variation}
        >
          <TableHead>
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
      </Example>
    </Flex>
  );
};
