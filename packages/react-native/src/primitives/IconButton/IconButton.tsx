import React, { useMemo } from 'react';
import { Image, Pressable } from 'react-native';

import { getStyles } from './styles';
import { IconButtonProps } from './types';

export default function IconButton({
  color,
  iconStyle,
  source,
  size = 16,
  ...rest
}: IconButtonProps): JSX.Element {
  const { icon } = useMemo(() => getStyles(color, size), [color, size]);

  return (
    <Pressable {...rest}>
      <Image source={source} style={[icon, iconStyle]} />
    </Pressable>
  );
}
