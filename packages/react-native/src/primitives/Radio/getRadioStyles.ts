/**
 * These utility functions are used to apply styles to
 * the two nested View's comprising the Radio:
 *   - The outer <View> is named 'radioContainer'
 *   - The inner <View> is named 'radioDot'
 *
 * If a customer passes a string ('small' | 'medium' | 'large') to the `size` prop,
 * then we return the respective dimensions as defined in the `styles` object for the 'radioContainer',
 * and calculate the dimensions of the inner 'radioDot' based on the outer 'radioContainer' size.
 *
 * If a customer passes a number to the `size` prop, then we simply calculate the dimensions
 * for both the 'radioDot' and 'radioContainer' based on that number.
 */

import { RadioSize, Size } from './types';
import { styles } from './styles';

type RadioLevel = 'radioContainer' | 'radioDot';

const getRadioDimensions = (level: RadioLevel, size: number) => {
  const adjustedSize = level === 'radioDot' ? Math.floor(size / 2) : size;

  return {
    height: adjustedSize,
    width: adjustedSize,
    ...(level === 'radioContainer' && {
      borderWidth: 1,
    }),
  };
};

export const getRadioStyles = (level: RadioLevel, size: Size): RadioSize => {
  if (typeof size !== 'number') {
    if (level === 'radioContainer') {
      return styles[size];
    }
    return getRadioDimensions(level, styles[size].height);
  }

  return getRadioDimensions(level, size);
};
