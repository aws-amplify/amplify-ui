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
            backgroundColor: { value: '{colors.green.40.value}' },
          },

          striped: {
            backgroundColor: { value: '{colors.blue.20.value}' },
          },
        },

        header: {
          color: { value: '{colors.brand.secondary.80.value}' },
          fontSize: { value: '{fontSizes.xl.value}' },
        },

        data: {
          fontWeight: { value: '{fontWeights.semibold.value}' },
        },
      },
    },
  },
};

export const TableThemeExample = () => (
  <ThemeProvider theme={theme}>
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
