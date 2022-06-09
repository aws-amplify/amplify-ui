import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
} from '@aws-amplify/ui-react';

export const TableFontSizePropExample = () => {
  const { tokens } = useTheme();
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell fontSize={tokens.fontSizes.xs}>Smaller Text</TableCell>
          <TableCell fontSize={tokens.fontSizes.xs}>Smaller Text</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
