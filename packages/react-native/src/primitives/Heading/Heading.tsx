import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { HeadingProps } from './types';

interface HeadingLevels {
  [key: number]: number;
}

// I'm not yet sure what these mappings should be
const headingLevels: HeadingLevels = {
  1: 24,
  2: 22,
  3: 20,
  4: 18,
  5: 16,
  6: 14,
};

// need to add isTruncated prop
export default function Heading({
  children,
  headingStyle,
  level = 6,
}: HeadingProps): JSX.Element {
  return (
    <Text
      style={[styles.text, { fontSize: headingLevels[level] }, headingStyle]}
    >
      {children}
    </Text>
  );
}
