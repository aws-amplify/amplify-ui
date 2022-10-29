import React, { useCallback } from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Icon } from '../Icon';

import { styles } from './styles';
import { IconButtonProps } from './types';

export default function IconButton({
  accessibilityRole = 'button',
  color,
  iconStyle,
  size = 20,
  source,
  style,
  ...rest
}: IconButtonProps): JSX.Element {
  const pressableStyle = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const pressedStateStyle =
        (typeof style === 'function' ? style({ pressed }) : style) ?? null;
      return [pressed ? styles.pressed : null, pressedStateStyle];
    },
    [style]
  );

  return (
    <Pressable
      {...rest}
      accessibilityRole={accessibilityRole}
      style={pressableStyle}
    >
      <Icon color={color} size={size} source={source} style={iconStyle} />
    </Pressable>
  );
}
