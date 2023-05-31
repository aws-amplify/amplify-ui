import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { BaseGridProps, ForwardRefPrimitive, Primitive } from '../types';
import { View } from '../View';

const GridPrimitive: Primitive<BaseGridProps, 'div'> = (
  { className, children, ...rest },
  ref
) => (
  <View
    className={classNames(ComponentClassNames.Grid, className)}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/grid)
 */
export const Grid = React.forwardRef(GridPrimitive) as ForwardRefPrimitive<
  BaseGridProps,
  'div'
>;

Grid.displayName = 'Grid';
