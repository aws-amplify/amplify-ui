import * as React from 'react';
import { TableSectionElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const TableHead = <T extends TableSectionElementProps>({
  children,
  ...rest
}: T): JSX.Element => {
  const Thead = useElement('Thead');
  return <Thead {...rest}>{children}</Thead>;
};
