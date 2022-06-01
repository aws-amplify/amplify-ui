import React, { useMemo } from 'react';
import { Image, Pressable } from 'react-native';

import { getStyles } from './styles';
import { IconButtonProps } from './types';

export default function IconButton({
  color,
  source,
  size = 16,
  ...pressableProps
}: IconButtonProps): JSX.Element {
  const { icon } = useMemo(() => getStyles(color, size), [color, size]);

  return (
    <Pressable {...pressableProps}>
      <Image source={source} style={icon} />
    </Pressable>
  );
}
