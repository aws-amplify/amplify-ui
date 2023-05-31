import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { ForwardRefPrimitive, Primitive, BaseTableHeadProps } from '../types';
import { View } from '../View';

const TableHeadPrimitive: Primitive<BaseTableHeadProps, 'thead'> = (
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

export const TableHead = React.forwardRef(
  TableHeadPrimitive
) as ForwardRefPrimitive<BaseTableHeadProps, 'thead'>;

TableHead.displayName = 'TableHead';
