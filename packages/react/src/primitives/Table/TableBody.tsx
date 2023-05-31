import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { ForwardRefPrimitive, Primitive, BaseTableBodyProps } from '../types';
import { View } from '../View';

const TableBodyPrimitive: Primitive<BaseTableBodyProps, 'tbody'> = (
  { children, className, ...rest },
  ref
) => (
  <View
    as="tbody"
    className={classNames(ComponentClassNames.TableBody, className)}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const TableBody = React.forwardRef(
  TableBodyPrimitive
) as ForwardRefPrimitive<BaseTableBodyProps, 'tbody'>;

TableBody.displayName = 'TableBody';
