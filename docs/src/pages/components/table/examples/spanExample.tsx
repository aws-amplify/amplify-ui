import { Table, TableBody, TableCell, TableRow } from '@aws-amplify/ui-react';

export const SpanExample = () => (
  <Table variation="bordered">
    <TableBody>
      <TableRow>
        <TableCell />
        <TableCell />
        <TableCell colspan="2" />
      </TableRow>
      <TableRow>
        <TableCell rowspan="2" />
        <TableCell />
        <TableCell />
        <TableCell rowspan="3" />
      </TableRow>
      <TableRow>
        <TableCell />
        <TableCell />
      </TableRow>
      <TableRow>
        <TableCell colspan="3" />
      </TableRow>
    </TableBody>
  </Table>
);
