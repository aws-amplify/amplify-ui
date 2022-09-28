/**
 * These utility functions are used to apply styles to
 * the two nested View's comprising the Radio:
 *   - The outer <View> is named 'radioContainer'
 *   - The inner <View> is named 'radioDot'
 *
 * If a customer passes a number to the `size` prop, then we simply calculate the dimensions
 * for both the 'radioContainer' and 'radioDot' based on that number.
 *
 * If a customer passes a string ('small' | 'medium' | 'large') to the `size` prop,
 * then we return the respective dimensions as defined in the `styles` object
 * (e.g., 'small' => { radioContainerSmall, radioDotSmall } )
 */

import { RadioSize, RadioSizes, Size } from './types';
import { styles } from './styles';
import { ViewStyle } from 'react-native';
import { capitalize } from '../../utils';

type RadioLevel = 'radioContainer' | 'radioDot';

const getRadioSize = (level: RadioLevel, size: Size): RadioSize => {
  const sizeKey = (level + capitalize(`${size}`)) as keyof RadioSizes;

  return styles[sizeKey];
};

export const getRadioDimensions = (
  size: Size
): { radioContainerSize: ViewStyle; radioDotSize: ViewStyle } => {
  if (typeof size === 'number') {
    return {
      radioContainerSize: { height: size, width: size },
      radioDotSize: { height: size * 0.5, width: size * 0.5 },
    };
  }

  return {
    radioContainerSize: getRadioSize('radioContainer', size),
    radioDotSize: getRadioSize('radioDot', size),
  };
};
