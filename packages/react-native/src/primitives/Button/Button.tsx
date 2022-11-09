import React, { useCallback } from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native';

import { useTheme } from '../../theme';
import { getThemedStyles } from './styles';
import { ButtonProps } from './types';

export default function Button({
  children,
  style,
  textStyle,
  ...props
}: ButtonProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  const pressableStyle = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const pressedStateStyle =
        (typeof style === 'function' ? style({ pressed }) : style) ?? null;
      return [pressed ? themedStyle.pressed : null, pressedStateStyle];
    },
    [style, themedStyle]
  );

  return (
    <Pressable {...props} style={pressableStyle}>
      {typeof children === 'string' ? (
        <Text style={[themedStyle.text, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
