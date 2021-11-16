import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { CardProps, Primitive } from '../types';
import { View } from '../View';

export const Card: Primitive<CardProps, 'div'> = ({
  className,
  children,
  variation,
  ...rest
}) => (
  <View
    className={classNames(ComponentClassNames.Card, className)}
    data-variation={variation}
    {...rest}
  >
    {children}
  </View>
);

Card.displayName = 'Card';
