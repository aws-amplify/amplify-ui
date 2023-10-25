import React, { useMemo } from 'react';
import { Animated, Image } from 'react-native';

import { useTheme } from '../../theme';
import { getThemedStyles } from './styles';
import { IconProps } from './types';

export default function Icon({
  accessible = true,
  accessibilityRole = 'image',
  animated,
  color,
  size,
  style,
  ...rest
}: IconProps): JSX.Element {
  const theme = useTheme();
  const themedStyle = useMemo(
    () => getThemedStyles(theme, color, size),
    [theme, color, size]
  );

  const imageProps: IconProps = {
    ...rest,
    accessible,
    accessibilityRole,
    style: [themedStyle.icon, style],
  };

  if (animated) {
    return <Animated.Image {...imageProps} />;
  }
  return <Image {...imageProps} />;
}
