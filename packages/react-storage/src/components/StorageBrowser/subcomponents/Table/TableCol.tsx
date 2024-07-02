import * as React from 'react';
import { TableColElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Column = <T extends TableColElementProps>({
  children,
  ...rest
}: T): JSX.Element => {
  const TableCol = useElement('TableCol');
  return <TableCol {...rest}>{children}</TableCol>;
};
