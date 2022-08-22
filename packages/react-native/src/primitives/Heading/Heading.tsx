import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { HeadingProps } from './types';

export default function Heading({
  children,
  headingStyle,
  level = 6,
  truncated = false,
}: HeadingProps): JSX.Element {
  return (
    <Text
      numberOfLines={truncated ? 1 : 0}
      style={[styles.text, styles[level], headingStyle]}
    >
      {children}
    </Text>
  );
}
