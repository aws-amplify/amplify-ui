import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseTableHeadProps,
  TableHeadProps,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const TableHeadPrimitive: Primitive<TableHeadProps, 'thead'> = (
  { children, className, ...rest },
  ref
) => (
  <View
    as="thead"
    className={classNames(ComponentClassName.TableHead, className)}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const TableHead: ForwardRefPrimitive<BaseTableHeadProps, 'thead'> =
  primitiveWithForwardRef(TableHeadPrimitive);

TableHead.displayName = 'TableHead';
