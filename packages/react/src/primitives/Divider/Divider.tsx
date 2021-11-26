import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared';
import { DividerProps, PrimitiveWithForwardRef } from '../types';
import { View } from '../View';

const DividerPrimitive: PrimitiveWithForwardRef<DividerProps, 'hr'> = (
  { className, orientation = 'horizontal', size, ...rest },
  ref
) => (
  <View
    aria-orientation={orientation}
    as="hr"
    className={classNames(ComponentClassNames.Divider, className)}
    data-size={size}
    ref={ref}
    {...rest}
  />
);

export const Divider = React.forwardRef(DividerPrimitive);

Divider.displayName = 'Divider';
