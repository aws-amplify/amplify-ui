import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FlexProps, Primitive } from '../types';
import { View } from '../View';

export const Flex: Primitive<FlexProps, 'div'> = ({
  className,
  children,
  ...rest
}) => (
  <View className={classNames(ComponentClassNames.Flex, className)} {...rest}>
    {children}
  </View>
);

Flex.displayName = 'Flex';
