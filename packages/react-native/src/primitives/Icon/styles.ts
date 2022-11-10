import { StyleSheet } from 'react-native';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

import { StrictTheme } from '../../theme';
import { IconProps, iconSizes, IconStyles } from './types';

const logger = new Logger('Icon-logger');

export const getThemedStyles = (
  theme: StrictTheme,
  color?: IconProps['color'],
  size?: IconProps['size']
): IconStyles => {
  const { components } = theme.tokens;

  let iconSize: number;
  if (!size) {
    iconSize = iconSizes.medium;
  } else if (typeof size === 'number') {
    iconSize = size;
  } else {
    if (!iconSizes[size]) {
      logger.warn(
        `"${size}" is not a valid icon size. Available values are: ${Object.keys(
          iconSizes
        )}`
      );
      iconSize = iconSizes.medium;
    } else {
      iconSize = iconSizes[size];
    }
  }

  return StyleSheet.create({
    icon: {
      height: iconSize,
      resizeMode: 'contain',
      tintColor: color,
      width: iconSize,
      ...components?.icon,
    },
  });
};
