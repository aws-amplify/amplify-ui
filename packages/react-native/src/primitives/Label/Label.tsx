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
    <Text {...rest} accessibilityRole="text" style={[styles.label, style]}>
      {children}
    </Text>
  );
}
