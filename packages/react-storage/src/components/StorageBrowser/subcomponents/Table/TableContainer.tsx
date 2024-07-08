import * as React from 'react';
import { TableElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const TableContainer = <T extends TableElementProps>({
  ariaLabel = 'Table',
  className: _className,
  children,
  ...rest
}: T): JSX.Element => {
  const Table = useElement('Table');
  const baseClassName = 'storage-browser-table';
  const className = _className ?? baseClassName;

  return (
    <Table {...rest} aria-label={ariaLabel} className={className}>
      {children}
    </Table>
  );
};
