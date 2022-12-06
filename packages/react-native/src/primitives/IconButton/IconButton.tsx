import React, { useMemo } from 'react';
import { Pressable, ViewStyle } from 'react-native';

import { useTheme } from '../../theme';
import { usePressableOverrideStyle } from '../../theme/hooks';

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

  const containerStyle: ViewStyle = useMemo(
    (): ViewStyle => ({
      ...themedStyle.container,
      ...(disabled && themedStyle.disabled),
    }),
    [disabled, themedStyle]
  );

  const pressableStyle = usePressableOverrideStyle({
    style,
    themedStyle: containerStyle,
    pressedStyle: themedStyle.pressed,
  });

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
