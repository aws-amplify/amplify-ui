import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { HeadingProps } from './types';

export default function Heading({
  children,
  level = 6,
  numberOfLines,
  style,
  ...rest
}: HeadingProps): JSX.Element {
  return (
    <Text
      accessibilityRole="header"
      numberOfLines={numberOfLines}
      style={[styles.text, styles[level], style]}
      {...rest}
    >
      {children}
    </Text>
  );
}
