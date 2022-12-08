import * as React from 'react';

import { Demo } from '@/components/Demo';

import { TablePropControls } from './TablePropControls';
import { useTableProps } from './useTableProps';
import { BasicExample } from './examples';
import { Table } from '@aws-amplify/ui-react';
import { demoState } from '@/utils/demoState';

const propsToCode = (props) => {
  const { caption, highlightOnHover, size, variation } = props;
  return (
    `
<Table
  caption="${caption}"
  highlightOnHover={${highlightOnHover}}` +
    (size ? `\n  size="${size}"` : '') +
    (variation ? `\n  variation="${variation}"` : '') +
    `>
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
  `
  );
};

const defaultTableProps = {
  caption: '',
  highlightOnHover: false,
};

export const TableDemo = () => {
  const tableProps = useTableProps(
    demoState.get(Table.displayName) || defaultTableProps
  );

  return (
    <Demo
      code={propsToCode(tableProps)}
      propControls={<TablePropControls {...tableProps} />}
    >
      <BasicExample
        caption={tableProps.caption}
        highlightOnHover={tableProps.highlightOnHover}
        size={tableProps.size}
        variation={tableProps.variation}
      />
    </Demo>
  );
};
