import * as React from 'react';
import { TableSectionElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const TableBody = <T extends TableSectionElementProps>({
  children,
  ...rest
}: T): JSX.Element => {
  const Tbody = useElement('Tbody');
  return <Tbody {...rest}>{children}</Tbody>;
};
