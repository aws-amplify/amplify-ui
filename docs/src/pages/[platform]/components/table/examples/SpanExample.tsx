import { Table, TableBody, TableCell, TableRow } from '@aws-amplify/ui-react';

export const SpanExample = () => (
  <Table variation="bordered">
    <TableBody>
      <TableRow>
        <TableCell />
        <TableCell />
        <TableCell
          // @ts-ignore // IGNORE
          colspan="2"
        />
      </TableRow>
      <TableRow>
        <TableCell
          // @ts-ignore // IGNORE
          rowspan="3"
        />
        <TableCell />
        <TableCell />
        <TableCell
          // @ts-ignore // IGNORE
          rowspan="3"
        />
      </TableRow>
      <TableRow>
        <TableCell />
        <TableCell />
      </TableRow>
      <TableRow>
        <TableCell
          // @ts-ignore // IGNORE
          colspan="3"
        />
      </TableRow>
    </TableBody>
  </Table>
);
