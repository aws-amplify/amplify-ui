import * as React from 'react';
import { TableRowElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const TableRow = <T extends TableRowElementProps>({
  children,
  ...rest
}: T): JSX.Element => {
  const Tr = useElement('Tr');
  return <Tr {...rest}>{children}</Tr>;
};
