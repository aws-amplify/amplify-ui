import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { HeadingProps } from './types';

export default function Heading({
  children,
  level = 6,
  style,
  accessibilityRole = 'header',
  ...rest
}: HeadingProps): JSX.Element {
  return (
    <Text
      {...rest}
      accessibilityRole={accessibilityRole}
      style={[styles.text, styles[level], style]}
    >
      {children}
    </Text>
  );
}
