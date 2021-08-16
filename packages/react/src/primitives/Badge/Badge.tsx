import * as React from 'react';
import { ComponentClassNames } from '../shared/constants';
import classNames from 'classnames';
import { BadgeProps } from '../types';
import { View } from '../View';

export const Badge: React.FC<BadgeProps> = ({
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
