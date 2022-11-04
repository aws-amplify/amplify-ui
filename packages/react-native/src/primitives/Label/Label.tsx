import React from 'react';
import { Text } from 'react-native';

import { useTheme } from '../../theme';
import { LabelProps } from './types';

export default function Label({
  accessibilityRole = 'text',
  children,
  style,
  ...rest
}: LabelProps): JSX.Element {
  const { tokens } = useTheme();
  return (
    <Text
      {...rest}
      accessibilityRole={accessibilityRole}
      style={[tokens.components.label, style]}
    >
      {children}
    </Text>
  );
}
