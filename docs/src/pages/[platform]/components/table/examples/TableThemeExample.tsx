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
        row: {
          hover: {
            backgroundColor: { value: '{colors.blue.20}' },
          },

          striped: {
            backgroundColor: { value: '{colors.blue.10}' },
          },
        },

        header: {
          color: { value: '{colors.blue.80}' },
          fontSize: { value: '{fontSizes.xl}' },
        },

        data: {
          fontWeight: { value: '{fontWeights.semibold}' },
        },
      },
    },
  },
};

export const TableThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Table highlightOnHover variation="striped">
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
