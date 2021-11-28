import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { PrimitiveWithForwardRef, TableFootProps } from '../types';
import { View } from '../View';

const TableFootPrimitive: PrimitiveWithForwardRef<TableFootProps, 'tfoot'> = (
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

export const TableFoot = React.forwardRef(TableFootPrimitive);

TableFoot.displayName = 'TableFoot';
