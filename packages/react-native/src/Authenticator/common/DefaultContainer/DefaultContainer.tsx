import React from 'react';
import { View } from 'react-native';

import { defaultContainerstyles } from './styles';
import { ContainerProps } from './types';

export default function DefaultContainer({
  children,
  ...rest
}: ContainerProps): JSX.Element | null {
  return (
    <View {...rest} style={defaultContainerstyles.container}>
      {children}
    </View>
  );
}
