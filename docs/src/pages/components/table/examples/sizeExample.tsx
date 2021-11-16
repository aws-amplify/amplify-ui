import { Flex, Table, TableCell, TableRow } from '@aws-amplify/ui-react';

export const SizeExample = () => (
  <Flex direction="column">
    <Table caption="Small Table" size="small">
      <TableRow>
        <TableCell>Small</TableCell>
        <TableCell>Small</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Small</TableCell>
        <TableCell>Small</TableCell>
      </TableRow>
    </Table>
    <Table caption="Default Table">
      <TableRow>
        <TableCell>Default</TableCell>
        <TableCell>Default</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Default</TableCell>
        <TableCell>Default</TableCell>
      </TableRow>
    </Table>
    <Table caption="Large Table" size="large">
      <TableRow>
        <TableCell>Large</TableCell>
        <TableCell>Large</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Large</TableCell>
        <TableCell>Large</TableCell>
      </TableRow>
    </Table>
  </Flex>
);
