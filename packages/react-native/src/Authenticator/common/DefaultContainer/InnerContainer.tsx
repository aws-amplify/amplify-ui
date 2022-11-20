import React from 'react';
import { View } from 'react-native';

import { innerContainerstyles } from './styles';
import { ContainerProps } from './types';

export default function InnerContainer({
  children,
  ...rest
}: ContainerProps): JSX.Element | null {
  return (
    <View {...rest} style={innerContainerstyles.container}>
      {children}
    </View>
  );
}
