import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@aws-amplify/ui-react';

export const HighlightExample = () => (
  <Table highlightOnHover={true}>
    <TableHead>
      <TableRow>
        <TableCell as="th" colSpan={2}>
          Not highlighted
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Highlighted on hover</TableCell>
        <TableCell>Highlighted on hover</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Highlighted on hover</TableCell>
        <TableCell>Highlighted on hover</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);
