import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
} from '@aws-amplify/ui-react';

export const TableStylePropExample = () => {
  const { tokens } = useTheme();
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell style={{ fontSize: `${tokens.fontSizes.xs}` }}>
            Smaller Text
          </TableCell>
          <TableCell style={{ fontSize: `${tokens.fontSizes.xs}` }}>
            Smaller Text
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
