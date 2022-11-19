import React, { useCallback, useMemo } from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { useTheme } from '../../theme';
import { capitalize } from '../../utils';
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

  const pressableStyle = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const pressedStateStyle =
        typeof style === 'function' ? style({ pressed }) : style;

      return [
        themedStyle.container,
        themedStyle[`container${capitalize(variant)}`],
        disabled ? themedStyle.disabled : null,
        pressed ? themedStyle.pressed : null,
        pressedStateStyle,
      ];
    },
    [disabled, style, themedStyle, variant]
  );

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
