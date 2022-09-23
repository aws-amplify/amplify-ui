import React from 'react';
import { Text } from 'react-native';
import { LabelProps } from './types';
import { styles } from './styles';

export default function Label({
  accessibilityRole = 'text',
  children,
  style,
  ...rest
}: LabelProps): JSX.Element {
  return (
    <Text
      {...rest}
      accessibilityRole={accessibilityRole}
      style={[styles.label, style]}
    >
      {children}
    </Text>
  );
}
