import { Table, TableBody, TableCell, TableRow } from '@aws-amplify/ui-react';

export const SpanExample = () => (
  <Table variation="bordered">
    <TableBody>
      <TableRow>
        <TableCell />
        <TableCell />
        <TableCell colSpan={2} />
      </TableRow>
      <TableRow>
        <TableCell rowSpan={2} />
        <TableCell />
        <TableCell />
        <TableCell rowSpan={3} />
      </TableRow>
      <TableRow>
        <TableCell />
        <TableCell />
      </TableRow>
      <TableRow>
        <TableCell colSpan={3} />
      </TableRow>
    </TableBody>
  </Table>
);
