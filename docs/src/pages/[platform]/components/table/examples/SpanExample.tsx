import { Table, TableBody, TableCell, TableRow } from '@aws-amplify/ui-react';

export const SpanExample = () => (
  <Table variation="bordered">
    <TableBody>
      <TableRow>
        <TableCell />
        <TableCell />
        <TableCell
          // @ts-ignore
          colspan="2"
        />
      </TableRow>
      <TableRow>
        <TableCell
          // @ts-ignore
          rowspan="3"
        />
        <TableCell />
        <TableCell />
        <TableCell
          // @ts-ignore
          rowspan="3"
        />
      </TableRow>
      <TableRow>
        <TableCell />
        <TableCell />
      </TableRow>
      <TableRow>
        <TableCell
          // @ts-ignore
          colspan="3"
        />
      </TableRow>
    </TableBody>
  </Table>
);
