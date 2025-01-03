import React, { useMemo } from 'react';
import { Pressable, Text, TextStyle, ViewStyle } from 'react-native';
import { capitalize } from '@aws-amplify/ui';

import { usePressableContainerStyles } from '../../hooks';
import { useTheme } from '../../theme';
import { getThemedStyles } from './styles';
import { ButtonProps } from './types';

export default function Button({
  accessibilityRole = 'button',
  children,
  disabled,
  style,
  textStyle,
  variant = 'default',
  ...rest
}: ButtonProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  const containerStyle: ViewStyle = useMemo(
    (): ViewStyle => ({
      ...themedStyle.container,
      ...themedStyle[`container${capitalize(variant)}`],
      ...(disabled && themedStyle.disabled),
    }),
    [disabled, themedStyle, variant]
  );

  const pressableStyle = usePressableContainerStyles({
    overrideStyle: style,
    containerStyle,
    pressedStyle: themedStyle.pressed,
  });

  const buttonTextStyle: TextStyle = useMemo(
    (): TextStyle => ({
      ...themedStyle.text,
      ...themedStyle[`text${capitalize(variant)}`],
    }),
    [themedStyle, variant]
  );

  return (
    <Pressable
      {...rest}
      accessibilityRole={accessibilityRole}
      disabled={disabled}
      style={pressableStyle}
    >
      {typeof children === 'string' ? (
        <Text style={[buttonTextStyle, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
