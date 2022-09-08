import React from 'react';
import { Text } from 'react-native';
import { LabelProps } from './types';
import { styles } from './styles';

export default function Label({
  children,
  style,
  ...rest
}: LabelProps): JSX.Element {
  return (
    <Text {...rest} style={[styles.label, style]}>
      {children}
    </Text>
  );
}
