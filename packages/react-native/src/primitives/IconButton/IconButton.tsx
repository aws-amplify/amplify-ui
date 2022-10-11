import React from 'react';
import { Pressable } from 'react-native';
import { Icon } from '../Icon';

import { IconButtonProps } from './types';

export default function IconButton({
  accessibilityRole = 'button',
  color,
  iconStyle,
  source,
  size = 16,
  ...rest
}: IconButtonProps): JSX.Element {
  return (
    <Pressable {...rest} accessibilityRole={accessibilityRole}>
      <Icon color={color} size={size} source={source} style={iconStyle} />
    </Pressable>
  );
}
