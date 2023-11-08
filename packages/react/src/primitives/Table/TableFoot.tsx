import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseTableFootProps,
  TableFootProps,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const TableFootPrimitive: Primitive<TableFootProps, 'tfoot'> = (
  { children, className, ...rest },
  ref
) => (
  <View
    as="tfoot"
    className={classNames(ComponentClassName.TableFoot, className)}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const TableFoot: ForwardRefPrimitive<BaseTableFootProps, 'tfoot'> =
  primitiveWithForwardRef(TableFootPrimitive);

TableFoot.displayName = 'TableFoot';
