import React from 'react';
import { Text } from 'react-native';

import { useTheme } from '../../theme';
import { LabelProps } from './types';
import { getThemedStyles } from './styles';

export default function Label({
  accessibilityRole = 'text',
  children,
  style,
  variant = 'primary',
  ...rest
}: LabelProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);
  const textStyle = [themedStyle.text, themedStyle[variant], style];

  return (
    <Text {...rest} accessibilityRole={accessibilityRole} style={textStyle}>
      {children}
    </Text>
  );
}
