import React, { useMemo } from 'react';
import { Animated, Image } from 'react-native';

import { getStyles } from './styles';
import { IconProps } from './types';

export default function Icon({
  accessibilityRole = 'image',
  animated,
  color,
  size,
  style,
  ...rest
}: IconProps): JSX.Element {
  const { icon } = useMemo(() => getStyles(color, size), [color, size]);

  const imageProps: IconProps = {
    ...rest,
    accessibilityRole,
    style: [icon, style],
  };

  if (animated) {
    return <Animated.Image {...imageProps} />;
  }
  return <Image {...imageProps} />;
}
