import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { ForwardRefPrimitive, Primitive, TableFootProps } from '../types';
import { View } from '../View';

const TableFootPrimitive: Primitive<TableFootProps, 'tfoot'> = (
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

export const TableFoot: ForwardRefPrimitive<TableFootProps, 'tfoot'> =
  React.forwardRef(TableFootPrimitive);

TableFoot.displayName = 'TableFoot';
