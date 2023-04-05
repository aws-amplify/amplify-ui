import * as React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from '@aws-amplify/ui-react';

import data from '@/data/cssvars-table.json';

export const CssVarsTable = () => {
  return (
    <Table variation="striped">
      <TableHead>
        <TableRow>
          <TableCell as="th">Amplify CSS Variable</TableCell>
          <TableCell as="th">Default Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ variable, value }) => (
          <TableRow key={`${variable}:${value}`}>
            <TableCell>{variable}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
