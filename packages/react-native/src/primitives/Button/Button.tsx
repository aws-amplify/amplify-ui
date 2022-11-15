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
  variant = 'primary',
  ...rest
}: ButtonProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  const pressableStyle = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const containerStyle = {
        ...themedStyle.container,
        ...themedStyle[`container${capitalize(variant)}`],
      };

      const pressedStateStyle =
        (typeof style === 'function' ? style({ pressed }) : style) ?? null;
      return [
        containerStyle,
        pressed ? themedStyle.pressed : null,
        pressedStateStyle,
        disabled ? themedStyle.disabled : null,
      ];
    },
    [disabled, style, themedStyle, variant]
  );

  const buttonTextStyle: TextStyle = useMemo(
    () => ({
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
