import React, { useCallback } from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native';

import { styles } from './styles';
import { ButtonProps } from './types';

export default function Button({
  children,
  style,
  textStyle,
  ...props
}: ButtonProps): JSX.Element {
  const pressableStyle = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const pressedStateStyle =
        (typeof style === 'function' ? style({ pressed }) : style) ?? null;
      return [pressed ? styles.pressed : null, pressedStateStyle];
    },
    [style]
  );

  return (
    <Pressable {...props} style={pressableStyle}>
      {typeof children === 'string' ? (
        <Text style={[styles.text, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
