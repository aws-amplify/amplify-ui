import * as React from 'react';
import { TableColElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const TableColumn = <T extends TableColElementProps>({
  children,
  ...rest
}: T): JSX.Element => {
  const Col = useElement('Col');
  return <Col {...rest}>{children}</Col>;
};
