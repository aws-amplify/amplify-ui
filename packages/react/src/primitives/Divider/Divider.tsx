import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared';
import { DividerProps, Primitive } from '../types';
import { View } from '../View';

const DividerPrimitive: Primitive<DividerProps, 'hr'> = (
  { className, orientation = 'horizontal', size, label, ...rest },
  ref
) => (
  <View
    aria-orientation={orientation}
    as="hr"
    className={classNames(
      ComponentClassNames.Divider,
      className,
      label ? ComponentClassNames.DividerLabel : null
    )}
    data-size={size}
    data-label={label}
    ref={ref}
    {...rest}
  />
);

export const Divider = React.forwardRef(DividerPrimitive);

Divider.displayName = 'Divider';
