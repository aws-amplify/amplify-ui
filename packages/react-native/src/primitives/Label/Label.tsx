import React from 'react';
import { Text } from 'react-native';

import { useTheme } from '../../theme';
import { LabelProps } from './types';
import { getThemedStyles } from './styles';

export default function Label({
  accessibilityRole = 'text',
  children,
  style,
  variation = 'primary',
  ...rest
}: LabelProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);
  const textStyle = [themedStyle.text, themedStyle[variation], style];

  return (
    <Text {...rest} accessibilityRole={accessibilityRole} style={textStyle}>
      {children}
    </Text>
  );
}
