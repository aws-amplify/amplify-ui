import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { ForwardRefPrimitive, Primitive, TableHeadProps } from '../types';
import { View } from '../View';

const TableHeadPrimitive: Primitive<TableHeadProps, 'thead'> = (
  { children, className, ...rest },
  ref
) => (
  <View
    as="thead"
    className={classNames(ComponentClassNames.TableHead, className)}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const TableHead: ForwardRefPrimitive<TableHeadProps, 'thead'> =
  React.forwardRef(TableHeadPrimitive);

TableHead.displayName = 'TableHead';
