import classNames from 'classnames';

import {
  Table,
  TableCell,
  View,
  TableCellProps,
  TableProps,
} from '@aws-amplify/ui-react';
import { OverflowGroup } from './OverflowGroup';

interface ResponsiveTableCellProps extends TableCellProps {
  label: string;
  children: React.ReactNode;
}

export function ResponsiveTableCell({
  as = 'td',
  children,
  label,
  className,
}: ResponsiveTableCellProps) {
  const componentClasses = classNames('docs-responsive-table__cell', className);

  return (
    <TableCell className={componentClasses} as={as}>
      <span className="docs-responsive-table__label" aria-hidden="true">
        {label}
      </span>
      <span className="docs-responsive-table__value">{children}</span>
    </TableCell>
  );
}

/**
 * Usage:
 * <ResponsiveTable labelWidth="10rem">
 *  <TableHead>
 *    <TableRow>
 *      <TableCell as="th"></TableCell>
 *    </TableRow>
 *    <TableBody>
 *      <ResponsiveTableCell></ResponsiveTableCell>
 *    </TableBody>
 *  </TableHead>
 */

interface ResponsiveTableProps extends TableProps {
  children: React.ReactNode;

  /* Width of cell label when table is collapsed */
  labelWidth?: string;
}

export function ResponsiveTable({
  labelWidth = '6rem',
  children,
  className,
  ...rest
}: ResponsiveTableProps) {
  const componentClasses = classNames('docs-responsive-table', className);

  const labelWidthStyle = { '--labelWidth': labelWidth } as React.CSSProperties;

  return (
    <OverflowGroup>
      <Table
        size="small"
        style={labelWidthStyle}
        className={componentClasses}
        {...rest}
      >
        {children}
      </Table>
    </OverflowGroup>
  );
}
