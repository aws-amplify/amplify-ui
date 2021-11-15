import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { BadgeProps, Primitive } from '../types';
import { View } from '../View';

export const Badge: Primitive<BadgeProps, 'span'> = ({
  className,
  children,
  variation,
  size,
  ...rest
}) => (
  <View
    as="span"
    className={classNames(ComponentClassNames.Badge, className)}
    data-variation={variation}
    data-size={size}
    {...rest}
  >
    {children}
  </View>
);

Badge.displayName = 'Badge';
