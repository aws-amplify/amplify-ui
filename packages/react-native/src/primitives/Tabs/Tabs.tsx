import React from 'react';
import { Text } from 'react-native';
import { TabsProps } from './types';
import { styles } from './styles';

export default function Tabs({
  // accessibilityRole = 'text',
  children,
  style,
  ...rest
}: TabsProps): JSX.Element {
  return (
    <Text
      {...rest}
      // accessibilityRole={accessibilityRole}
      style={[styles.label, style]}
    >
      {children}
    </Text>
  );
}
