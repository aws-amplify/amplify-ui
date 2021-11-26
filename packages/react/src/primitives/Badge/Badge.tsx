import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { BadgeProps, PrimitiveWithForwardRef } from '../types';
import { View } from '../View';

const BadgePrimitive: PrimitiveWithForwardRef<BadgeProps, 'span'> = (
  { className, children, variation, size, ...rest },
  ref
) => (
  <View
    as="span"
    className={classNames(ComponentClassNames.Badge, className)}
    data-variation={variation}
    data-size={size}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const Badge = React.forwardRef(BadgePrimitive);

Badge.displayName = 'Badge';
