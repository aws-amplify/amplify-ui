import classNames from 'classnames';

import {
  Table,
  TableCell,
  ScrollView,
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
 *      <TableCell as="th"></TableCell>
 *    </TableRow>
 *    <TableBody>
 *      <ResponsiveTableCell></ResponsiveTableCell>
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
    <ScrollView tabIndex={0} role="group" className="docs-overflowGroup">
      <Table
        size="small"
        style={labelWidthStyle}
        className={componentClasses}
        {...rest}
      >
        {children}
      </Table>
    </ScrollView>
  );
}
