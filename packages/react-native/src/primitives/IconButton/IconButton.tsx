import React, { useCallback } from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { useTheme } from '../../theme';
import { getThemedStyles } from './styles';
import { Icon, iconSizes } from '../Icon';
import { IconButtonProps } from './types';

export default function IconButton({
  accessibilityRole = 'button',
  color,
  disabled,
  iconStyle,
  size = iconSizes.medium,
  source,
  style,
  ...rest
}: IconButtonProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = getThemedStyles(theme);

  const pressableStyle = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      const pressedStateStyle =
        typeof style === 'function' ? style({ pressed }) : style;
      return [
        themedStyle.container,
        disabled ? themedStyle.disabled : null,
        pressed ? themedStyle.pressed : null,
        pressedStateStyle,
      ];
    },
    [disabled, style, themedStyle]
  );

  return (
    <Pressable
      {...rest}
      accessibilityRole={accessibilityRole}
      disabled={disabled}
      style={pressableStyle}
    >
      <Icon color={color} size={size} source={source} style={iconStyle} />
    </Pressable>
  );
}
