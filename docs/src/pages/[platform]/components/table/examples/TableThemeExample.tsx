import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'table-theme',
  tokens: {
    components: {
      table: {
        // TODO: customize here
      },
      // subcomponents?
    },
  },
};

export const TableThemeExample = () => (
  <ThemeProvider theme={theme}>
    <Table
    // caption={}
    // highlightOnHover={false}
    // size={undefined}
    // variation={undefined}
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
  </ThemeProvider>
);
