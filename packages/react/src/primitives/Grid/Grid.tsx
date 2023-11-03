import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import {
  BaseGridProps,
  GridProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const GridPrimitive: Primitive<GridProps, 'div'> = (
  { className, children, ...rest },
  ref
) => (
  <View
    className={classNames(ComponentClassName.Grid, className)}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/grid)
 */
export const Grid: ForwardRefPrimitive<BaseGridProps, 'div'> =
  primitiveWithForwardRef(GridPrimitive);

Grid.displayName = 'Grid';
