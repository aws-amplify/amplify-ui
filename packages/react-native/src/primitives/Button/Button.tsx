import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';

import { useTheme } from '../../hooks';
import { baseStyles, getThemedStyles } from './styles';
import { ButtonProps } from './types';

export default function Button({
  accessibilityRole = 'button',
  children,
  style,
  textStyle,
  ...pressableProps
}: ButtonProps): JSX.Element {
  const theme = useTheme();
  const themedButtonStyle = getThemedStyles(theme);

  //TODO: complete theming [with states and variants] and handle style prop being either a callback function or a ViewStyle

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      style={[
        baseStyles.container,
        themedButtonStyle.container,
        style as ViewStyle,
      ]}
      {...pressableProps}
    >
      {typeof children === 'string' ? (
        <Text style={[baseStyles.text, themedButtonStyle.text, textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
