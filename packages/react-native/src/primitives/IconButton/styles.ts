import { StyleSheet } from 'react-native';

import { IconButtonProps, IconButtonStyles } from '.';

export const getStyles = (
  color: IconButtonProps['color'],
  size: IconButtonProps['size']
): IconButtonStyles =>
  StyleSheet.create({
    icon: {
      height: size,
      resizeMode: 'contain',
      tintColor: color,
      width: size,
    },
  });
