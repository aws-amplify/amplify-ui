import * as React from 'react';
import { TableCellElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const TableCell = <T extends TableCellElementProps>({
  children,
  ...rest
}: T): JSX.Element => {
  const Td = useElement('Td');
  return <Td {...rest}>{children}</Td>;
};
