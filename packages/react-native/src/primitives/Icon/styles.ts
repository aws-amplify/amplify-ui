import { StyleSheet } from 'react-native';

import { IconProps, IconStyles } from './types';

export const getStyles = (
  color: IconProps['color'],
  size: IconProps['size']
): IconStyles =>
  StyleSheet.create({
    icon: {
      height: size,
      resizeMode: 'contain',
      tintColor: color,
      width: size,
    },
  });
