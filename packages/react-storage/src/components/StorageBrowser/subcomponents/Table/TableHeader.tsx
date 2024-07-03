import * as React from 'react';
import { TableCellElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const TableHeader = <T extends TableCellElementProps>({
  children,
  ...rest
}: T): JSX.Element => {
  const Th = useElement('Th');
  return <Th {...rest}>{children}</Th>;
};
