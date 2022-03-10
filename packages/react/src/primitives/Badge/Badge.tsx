import * as React from 'react';
import classNames from 'classnames';

import { BadgeProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { View } from '../View';

const BadgePrimitive: Primitive<BadgeProps, 'span'> = (
  { className, children, variation, size, ...rest },
  ref
) => {
  return (
    <View
      as="span"
      className={classNames(
        ComponentClassNames.Badge,
        className,
        variation ? `${ComponentClassNames.Badge}--${variation}` : null,
        size ? `${ComponentClassNames.Badge}--${size}` : null
      )}
      data-variation={variation}
      data-size={size}
      ref={ref}
      {...rest}
    >
      {children}
    </View>
  );
};

export const Badge = React.forwardRef(BadgePrimitive);

Badge.displayName = 'Badge';
