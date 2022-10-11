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

  if (animated) {
    return (
      <Animated.Image
        {...rest}
        accessibilityRole={accessibilityRole}
        style={[icon, style]}
      />
    );
  }
  return (
    <Image
      {...rest}
      accessibilityRole={accessibilityRole}
      style={[icon, style]}
    />
  );
}
