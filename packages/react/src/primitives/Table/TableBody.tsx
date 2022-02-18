import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { Primitive, TableBodyProps } from '../types';
import { View } from '../View';

const TableBodyPrimitive: Primitive<TableBodyProps, 'tbody'> = (
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

export const TableBody = React.forwardRef(TableBodyPrimitive);

TableBody.displayName = 'TableBody';
