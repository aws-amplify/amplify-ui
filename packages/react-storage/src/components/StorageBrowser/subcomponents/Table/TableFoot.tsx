import * as React from 'react';
import { TableSectionElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const TableFoot = <T extends TableSectionElementProps>({
  children,
  ...rest
}: T): JSX.Element => {
  const Tfoot = useElement('Tfoot');
  return <Tfoot {...rest}>{children}</Tfoot>;
};
