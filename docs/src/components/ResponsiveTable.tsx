import classNames from 'classnames';

import {
  Table,
  TableCell,
  TableCellProps,
  TableProps,
} from '@aws-amplify/ui-react';

interface ResponsiveTableCellProps extends TableCellProps {
  label: string;
  children: React.ReactNode;
}

export function ResponsiveTableCell({
  as = 'td',
  children,
  label,
  className,
  ...rest
}: ResponsiveTableCellProps) {
  const componentClasses = classNames('docs-responsiveTable__cell', className);

  return (
    <TableCell className={componentClasses} as={as} {...rest}>
      <span className="docs-responsiveTable__label" aria-hidden="true">
        {label}
      </span>
      <span className="docs-responsiveTable__value">{children}</span>
    </TableCell>
  );
}

interface ResponsiveTableProps extends TableProps {
  children: React.ReactNode;

  /* Width of cell label when table is collapsed */
  labelWidth?: string;
}

/**
 * Usage:
 * <ResponsiveTable labelWidth="10rem">
 *  <TableHead>
 *    <TableRow>
 *      <TableCell as="th">Name</TableCell>
 *    </TableRow>
 *    <TableBody>
 *      <ResponsiveTableCell label="Name">Item</ResponsiveTableCell>
 *    </TableBody>
 *  </TableHead>
 */

export function ResponsiveTable({
  labelWidth = '6rem',
  children,
  className,
  ...rest
}: ResponsiveTableProps) {
  const componentClasses = classNames('docs-responsiveTable', className);

  const labelWidthStyle = { '--labelWidth': labelWidth } as React.CSSProperties;

  return (
    <Table
      size="small"
      style={labelWidthStyle}
      className={componentClasses}
      {...rest}
    >
      {children}
    </Table>
  );
}
