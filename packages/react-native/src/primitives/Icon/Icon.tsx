import React, { useMemo } from 'react';
import { Animated, Image } from 'react-native';

import { getStyles } from './styles';
import { IconProps } from './types';

export default function Icon({
  color,
  animated = false,
  size,
  style,
  ...rest
}: IconProps): JSX.Element {
  const { icon } = useMemo(() => getStyles(color, size), [color, size]);

  if (animated) {
    return (
      <Animated.Image {...rest} style={[icon, { tintColor: color }, style]} />
    );
  }
  return <Image {...rest} style={[icon, style]} />;
}
