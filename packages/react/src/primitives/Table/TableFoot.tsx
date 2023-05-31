import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { ForwardRefPrimitive, Primitive, BaseTableFootProps } from '../types';
import { View } from '../View';

const TableFootPrimitive: Primitive<BaseTableFootProps, 'tfoot'> = (
  { children, className, ...rest },
  ref
) => (
  <View
    as="tfoot"
    className={classNames(ComponentClassNames.TableFoot, className)}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const TableFoot = React.forwardRef(
  TableFootPrimitive
) as ForwardRefPrimitive<BaseTableFootProps, 'tfoot'>;

TableFoot.displayName = 'TableFoot';
