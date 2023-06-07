import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import {
  ForwardRefPrimitive,
  Primitive,
  TableCellElement,
  BaseTableCellProps,
  TableCellProps,
} from '../types';
import { View } from '../View';

const TableCellPrimitive: Primitive<TableCellProps, TableCellElement> = (
  { as: asElementTag = 'td', children, className, ...rest },
  ref
) => (
  <View
    as={asElementTag}
    className={classNames(
      asElementTag === 'td'
        ? ComponentClassNames.TableTd
        : ComponentClassNames.TableTh,
      className
    )}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const TableCell: ForwardRefPrimitive<
  BaseTableCellProps,
  TableCellElement
> = React.forwardRef(TableCellPrimitive);

TableCell.displayName = 'TableCell';
