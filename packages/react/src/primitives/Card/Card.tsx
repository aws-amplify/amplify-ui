import classNames from 'classnames';
import * as React from 'react';
import { ComponentClassNames } from '../shared/constants';
import { CardProps } from '../types/card';
import { View } from '../View';

export const Card: React.FC<CardProps> = ({ className, children, ...rest }) => {
  return (
    <View className={classNames(ComponentClassNames.Card, className)} {...rest}>
      {children}
    </View>
  );
};
