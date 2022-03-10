import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared';
import { DividerProps, Primitive } from '../types';
import { View } from '../View';

const DividerPrimitive: Primitive<DividerProps, 'hr'> = (
  { className, orientation = 'horizontal', size, label, ...rest },
  ref
) => {
  return (
    <View
      aria-orientation={orientation}
      as="hr"
      className={classNames(
        ComponentClassNames.Divider,
        `${ComponentClassNames.Divider}--${orientation}`,
        size ? `${ComponentClassNames.Divider}--${size}` : null,
        label ? ComponentClassNames.DividerLabel : null,
        className
      )}
      data-size={size}
      data-label={label}
      ref={ref}
      {...rest}
    />
  );
};

export const Divider = React.forwardRef(DividerPrimitive);

Divider.displayName = 'Divider';
