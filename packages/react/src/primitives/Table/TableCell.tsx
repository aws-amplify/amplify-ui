import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import {
  ForwardRefPrimitive,
  Primitive,
  TableCellElement,
  BaseTableCellProps,
} from '../types';
import { View } from '../View';

const TableCellPrimitive: Primitive<BaseTableCellProps, TableCellElement> = (
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

export const TableCell = React.forwardRef(
  TableCellPrimitive
) as ForwardRefPrimitive<BaseTableCellProps, TableCellElement>;

TableCell.displayName = 'TableCell';
