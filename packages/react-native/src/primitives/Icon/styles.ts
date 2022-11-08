import { StyleSheet } from 'react-native';

import { StrictTheme } from '../../theme';
import { IconProps, IconStyles } from './types';

export const getThemedStyles = (
  theme: StrictTheme,
  color?: IconProps['color'],
  size?: IconProps['size']
): IconStyles => {
  const { components } = theme.tokens;

  return StyleSheet.create({
    icon: {
      height: size,
      resizeMode: 'contain',
      tintColor: color,
      width: size,
      ...components?.icon,
    },
  });
};
