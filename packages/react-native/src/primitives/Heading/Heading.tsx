import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { HeadingProps } from './types';

// add isTruncated prop?
export default function Heading({
  children,
  headingStyle,
  level = 6,
}: HeadingProps): JSX.Element {
  return (
    <Text style={[styles.text, styles[level], headingStyle]}>{children}</Text>
  );
}
