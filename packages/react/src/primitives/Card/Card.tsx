import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { CardProps, Primitive } from '../types';
import { View } from '../View';

export const Card: Primitive<CardProps, 'div'> = ({
  className,
  children,
  ...rest
}) => (
  <View className={classNames(ComponentClassNames.Card, className)} {...rest}>
    {children}
  </View>
);
