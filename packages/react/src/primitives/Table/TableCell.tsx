import * as React from 'react';
import { tableClasses } from '@aws-amplify/ui';

import {
  ForwardRefPrimitive,
  Primitive,
  TableCellElement,
  BaseTableCellProps,
  TableCellProps,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const TableCellPrimitive: Primitive<TableCellProps, TableCellElement> = (
  { as: asElementTag = 'td', children, className, ...rest },
  ref
) => (
  <View
    as={asElementTag}
    className={tableClasses(
      {
        _element: asElementTag === 'td' ? 'td' : 'th',
      },
      [className]
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
> = primitiveWithForwardRef(TableCellPrimitive);

TableCell.displayName = 'TableCell';
