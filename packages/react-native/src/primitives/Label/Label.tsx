import React from 'react';
import { Text } from 'react-native';

import { styles } from './styles';
import { LabelProps } from './types';

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
