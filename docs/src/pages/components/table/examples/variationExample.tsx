import { Flex, Table, TableCell, TableRow } from '@aws-amplify/ui-react';

export const VariationExample = () => (
  <Flex direction="column">
    <Table variation="bordered">
      <TableRow>
        <TableCell>Bordered</TableCell>
        <TableCell>Bordered</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Bordered</TableCell>
        <TableCell>Bordered</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Bordered</TableCell>
        <TableCell>Bordered</TableCell>
      </TableRow>
    </Table>
    <Table variation="striped">
      <TableRow>
        <TableCell>Striped</TableCell>
        <TableCell>Striped</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Striped</TableCell>
        <TableCell>Striped</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Striped</TableCell>
        <TableCell>Striped</TableCell>
      </TableRow>
    </Table>
  </Flex>
);
