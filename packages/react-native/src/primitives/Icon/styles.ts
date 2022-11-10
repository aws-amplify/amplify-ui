import { StyleSheet } from 'react-native';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

import { StrictTheme } from '../../theme';
import { IconProps, iconSizes, IconStyles } from './types';

const logger = new Logger('Icon-logger');

const getIconSize = (size: IconProps['size']): number => {
  if (!size) {
    return iconSizes.medium;
  }

  if (typeof size === 'number') {
    return size;
  }

  if (!iconSizes[size]) {
    logger.warn(
      `"${size}" is not a valid icon size. Available values are: ${Object.keys(
        iconSizes
      )}`
    );
    return iconSizes.medium;
  } else {
    return iconSizes[size];
  }
};

export const getThemedStyles = (
  theme: StrictTheme,
  color?: IconProps['color'],
  size?: IconProps['size']
): IconStyles => {
  const { components } = theme.tokens;
  const iconSize = getIconSize(size);

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
