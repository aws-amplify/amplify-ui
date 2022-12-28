import React from 'react';
import { Text } from 'react-native';

import { useTheme } from '../../theme';
import { getThemedStyles } from './styles';
import { HeadingProps } from './types';

export default function Heading({
  accessibilityRole = 'header',
  children,
  level = 6,
  style,
  ...rest
}: HeadingProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  return (
    <Text
      {...rest}
      accessibilityRole={accessibilityRole}
      style={[themedStyle.text, themedStyle[level], style]}
    >
      {children}
    </Text>
  );
}
