import * as React from 'react';
import { tableClasses } from '@aws-amplify/ui';

import {
  ForwardRefPrimitive,
  Primitive,
  BaseTableRowProps,
  TableRowProps,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const TableRowPrimitive: Primitive<TableRowProps, 'tr'> = (
  { children, className, ...rest },
  ref
) => (
  <View
    as="tr"
    className={tableClasses({ _element: 'row' }, [className])}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const TableRow: ForwardRefPrimitive<BaseTableRowProps, 'tr'> =
  primitiveWithForwardRef(TableRowPrimitive);

TableRow.displayName = 'TableRow';
